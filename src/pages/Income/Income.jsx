import PropTypes from "prop-types";
import React,  { useContext, useEffect, useState } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//Slider
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import AuthContext from "../../Context/auth";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiAxios from '../../services/axios'
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Income = props => {

    //meta title
    document.title="store24h - Agente | Renda";
    const { token } = useContext(AuthContext);
    const [renda, setRenda] = useState(1.5);
    const [rendax, setRendax] = useState(1.5);
    const [modelo, setModelo] = useState('');
    const [minGanhos, setMinGanhos] = useState(0.5);
    const [maxGanhos, setMaxGanhos] = useState(2.25);
    //servicos
    const [loadingServices, setLoadingServices] = useState(true);
    const [services, setListServices] = useState([]);
    const [valorSolicitado, setValorSolicitado] = useState(0);
    //error api
    const [errorApi, setErrorApi] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Ops, algo deu errado tente novamente!');
    //Edit Price
    const [indexPrice, setIndexPrice] = useState(-1);
    const [loadingPrice, setLoadingPrice] = useState(false);
    //SnackBar
    const [state, setState] = useState({
        openSnackBar: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openSnackBar } = state;

    useEffect(() => {
        getAllServices();

    }, []);

    async function getAllServices() {
        try {
            setLoadingServices(true);
            const response = await apiAxios.get("/apiServicos/getAllServicesX");
            setListServices(response.data);
            setLoadingServices(false);
        } catch(e) {
            console.log("getAllServices", e);
            setLoadingServices(false);
        }
    }

    async function apiEditPrice(id) {
        try {
            setLoadingPrice(true);
            setIndexPrice(id);
            setErrorApi(false);
            await apiAxios.post(`/apiServicos/edit/price/${id}`, { newPrice: valorSolicitado}, { headers: {'Authorization': `Bearer ${token}`}});
            setLoadingPrice(false);
            await getAllServices();
            handleClickSnackBar({vertical: 'top', horizontal: 'center' });
        } catch(e) {
            setErrorApi(true);
            handleClickSnackBar({vertical: 'top', horizontal: 'center' });
            setLoadingPrice(false);
        }
    }

    const handleChange = (event, newValue) => {
        setRenda(newValue)
        event.target.value = () => renda
    };

    async function editService(id) {
        try {
            await apiAxios.post(`/apiServicos/editService/${id}`, { "price" : valorSolicitado });
            setValorSolicitado(0);

        } catch(e) { 
            console.log("editService", e);
        }
    }
    
    function getImg(name) {
        return `/img/servicesImg/${name}0.png`;
    }

    function handleClickSnackBar(newState) {
        setState({ openSnackBar: true, ...newState });
    };

    function handleCloseSnackBar() {
        setState({ ...state, openSnackBar: false });
    };

    function aux(serviceId) {
        setLoadingPrice(true);
        setIndexPrice(serviceId);
        setErrorApi(false);
        console.log(renda);
        setTimeout(() => {
            setLoadingPrice(false);
        }, 3000);
    }

    function valueInput(event) {
        try {
            return event.target.firstChild.value;
        } catch(e) {
            return event.target.valueAsNumber; 
        }
    }

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Renda")}
                breadcrumbItem={props.t("Renda")}
            />
                <div style={{ marginBottom: '2%'}}>
                    <p>Ajuste os preços de acordo com suas preferências</p>
                    <p>Escolha os serviços de seu interesse:</p>
                    <p style={{ color: 'red' }}>*Você pode usar as setas do teclado para auxiliar na seleção caso seja necessário*</p>
                </div>
                {
                    services.length == 0 ?
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress />
                        </div>
                    :
                        services.map((service, index) => (
                            <div key={index} style={{ marginTop: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'start'}}>
                                    <img src={getImg(service.alias)} alt="..." style={{ width: '1.5rem', height: '1.5rem'}}/>
                                    <p style={{ marginLeft: '0.5rem', marginTop: '0.1rem' }}>{service.name}</p>
                                    <p style={{ marginLeft: '4rem' }}>Valor do Serviço: R${service.price.toFixed(2)}</p>
                                    <p style={{ marginLeft: '4rem' }}>renda máxima possível é de R$ {Math.round(service.maxPrice).toFixed(2)}.</p>
                                </div>
                                <Box width={300}>
                                    <Slider
                                        aria-label="Small steps"
                                        defaultValue={service.price}
                                        valueLabelDisplay="auto"
                                        onChange={handleChange}
                                        onChangeCommitted={ (e) => {
                                            console.log("e.target", e.target);
                                            // console.log("e.target.firstChildX\n", lol);
                                            setValorSolicitado(valueInput(e));
                                        }}
                                        step={0.01}
                                        min={minGanhos}
                                        max={Number(Math.round(service.maxPrice.toFixed(2)))}
                                        />
                                    <LoadingButton
                                        loading={service.id == indexPrice && loadingPrice ? true : false}
                                        variant="contained"
                                        color="success"
                                        onClick={() => aux(service.id)} //{apiEditPrice(service.id)}
                                        style={{ marginLeft: '0.5%', marginTop: '2rem' }}
                                    >
                                        Salvar
                                    </LoadingButton>
                                </Box>
                            </div>
                    ))}
            </Container>
        </div>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
            <Alert onClose={handleCloseSnackBar} severity={errorApi ? "error" : "success"} sx={{ width: '100%' }}>
                { errorApi ? errorMsg : `Preço editado!`}
            </Alert>
        </Snackbar>
        </React.Fragment>
    );
};

Income.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Income);