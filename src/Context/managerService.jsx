import 'regenerator-runtime/runtime'
import React, { createContext, useState, useEffect, useContext } from "react";
import isValidToken, { getApiKeySystemAsyncStorage, getTokenAsyncStorage, removeDateAsyncSotorage, setApiKeySystemAsyncStorage, setTokenAsyncStorage, getUserAsyncStorage, setUserAsyncStorage } from "../isValidToken/isValidToken";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiAxios, { api, apiAxiosHub } from '../services/axios';
import AuthContext from './auth';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManagerServiceContext = createContext(ManagerServiceProvider);

export function ManagerServiceProvider({ children }) {

    const { logado, apiKey } = useContext(AuthContext);
    const [smsList, setSmsList] = useState([]);
    const [smsListApi, setSmsListApi] = useState([]);

    const [loading, setLoading] = useState(true);
    const [lengthList, setLengthList] = useState(0);
    //Lateral esquerda serviços
    // const [loading, setLoading] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    //error api
    const [errorApi, setErrorApi] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Ops, algo deu errado tente novamente!');
    //SnackBar
    const [state, setState] = useState({
        openSnackBar: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, openSnackBar } = state;

    useEffect(() => {
        getService();
        if(logado == true) {
            userAPI();
            setInterval(userAPI, 10000);
        }
    }, [logado]);



    async function userAPI() {
        try {
            const token = await getTokenAsyncStorage();
            const response = await apiAxios.get('/activations', { headers: { 'Authorization' : `Bearer ${token}`}});
            setSmsListApi(response.data);
            setLoading(false);
        } catch(e) {
            setLoading(false);
        }
    }

    async function getService() {
        try {
            const response = await apiAxios.get(`/apiServicos/activity`);
            setServiceList(response.data);
        } catch(e) {
            console.log("getService", e);
            setLoadingServices(false);
        }
    }
    
      async function compraServico(serviceName) {
        if(logado == false) {
            setErrorApi(true);
            setErrorMsg("Faça login para conseguir comprar!");
            handleClickSnackBar({vertical: 'top', horizontal: 'center' });
        } else {
            try {
                setErrorApi(false);
                console.log(serviceName);
                const response = await api.get(`/handler_api?api_key=${apiKey}&action=getNumber&service=${serviceName}&country=73`);
                const badResponse = ["NO_NUMBERS", "NO_BALANCE", "BAD_KEY"];
                if(badResponse.includes(response.data)) {
                    if(response.data == "NO_NUMBERS") {
                        setErrorMsg("Não tem números disponíveis para este serviço no momento!");
                    } else if(response.data == "NO_BALANCE") {
                        setErrorMsg("Sua conta não tem mais crédito!");
                    } else {
                        setErrorMsg("Sua chave de api esta errada!");
                    }
                    setErrorApi(true);
                    handleClickSnackBar({vertical: 'top', horizontal: 'center' });
                    return;
                }
                if(window.location.href != "https://apcodes.top/app/hub24h/activations") {
                    window.location = "https://apcodes.top/app/hub24h/activations";
                }
                getService();
                await userAPI();
                handleClickSnackBar({vertical: 'top', horizontal: 'center' });
        
            } catch(e) {
                console.log(e);
                setErrorApi(true);
                handleClickSnackBar({vertical: 'top', horizontal: 'center' });
            }
        }
    }

    function handleClickSnackBar(newState) {
        setState({ openSnackBar: true, ...newState });
    };

    function handleCloseSnackBar() {
        setState({ ...state, openSnackBar: false });
    };
    
    return (
        <ManagerServiceContext.Provider value={{ serviceList, smsListApi, compraServico, userAPI, getService }}>
            {children}
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
            >
                <Alert onClose={handleCloseSnackBar} severity={errorApi ? "error" : "success"} sx={{ width: '100%' }}>
                    { errorApi ? errorMsg : `Sua compra foi Realizada com Sucesso!`}
                </Alert>
            </Snackbar>
        </ManagerServiceContext.Provider>
    )
}

export default ManagerServiceContext;