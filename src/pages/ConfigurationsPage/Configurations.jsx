import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthContext from "../../Context/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack"; 
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import apiAxios from "../../services/axios";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DescreptionApi = props => {
    const { logado, apiKey, token } = useContext(AuthContext);
    //meta title
    document.title="Configurações";
    const [loading, setLoading] = useState(false);
    const[currentPassword, setCurrentPassword] = useState('');
    const[newPassword, setNewPassword] = useState('');
    const[newPassword2, setNewPassword2] = useState('');
    //error
    const [errorApi, setErrorApi] = useState(false);
    //Snackbar
    const [open, setOpen] = useState(false);
    const [textSnackbar, setTextSnackbar] = useState('');

    async function apiChangePassword() {
        try {
            setLoading(true);
            setErrorApi(false);
            const obj = {
                "currentPassword": currentPassword,
                "newPassword": newPassword,
                "newPassword2": newPassword2 
            }
            const response = await apiAxios.post("/edit/password", obj, { headers: { 'Authorization' : `Bearer ${token}`}});
            setTextSnackbar(response.data);
            setOpen(true);
            setLoading(false);

        } catch(e) {
            // setTextSnackbar(e);
            console.log(e)
            console.log("Error getApiKey", e.response.data);
            setTextSnackbar(e.response.data);
            setErrorApi(true);
            setOpen(true);
            setLoading(false);
        }
    }


    function handleClick() { 
      setOpen(true);
      setTextSnackbar("Copiado")
      navigator.clipboard.writeText(apiKey);
    }


    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={props.t("Configurações")}
              breadcrumbItem={props.t("Configurações")}
            />
              <div>
                  <p>Para melhorar a segurança, você pode ativar a autenticação de dois fatores instalando o aplicativo Google Authenticator gratuito. Você pode baixá-lo para o seu telefone para as plataformas Google Android e iOS. Depois de ativar a autenticação de dois fatores, você precisará inserir um código sempre que fizer login na sua conta e alterar as configurações no site. </p>
                  {
                  !logado ?
                          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 40 }}>
                              <h3>
                                  Faça login para ter acesso a sua chave de API.
                              </h3>
                          </div>
                      :
                          <>
                              <h2>Sua APIKEY</h2>
                              <Box
                                  component="form"
                                  sx={{
                                      '& > :not(style)': { m: 1, width: '25ch' },
                                      display: 'flex',
                                      flexDirection: 'row'
                                  }}
                                  noValidate
                                  autoComplete="off"
                              >
                                  <TextField
                                      id="outlined-basic"
                                      size='small'
                                      value={apiKey}
                                      label="apiKey"
                                      variant="standard"
                                      type='text'
                                  />
                                  <Stack spacing={2} direction="row">
                                      <Button variant="contained" onClick={handleClick}>Copiar</Button>
                                  </Stack>
                              </Box>
                          </>
                  }
              </div>
                {
                  logado &&
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            display: 'flex',
                            flexDirection: 'column',

                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            label="Senha Atual"
                            variant="outlined"
                            type='password'
                            onChange={e => setCurrentPassword(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Nova Senha"
                            variant="outlined"
                            type='password'
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Repita a nova senha"
                            variant="outlined"
                            type='password'
                            onChange={e => setNewPassword2(e.target.value)}
                        />
                        <Stack spacing={2} direction="row">
                            {
                                loading ? 
                                    <CircularProgress />
                                :
                                    <Button
                                        variant="contained"
                                        onClick={apiChangePassword}
                                    >
                                        Alterar
                                    </Button>
                            }
                        </Stack>
                    </Box>
                }
          </Container>
          <Snackbar
              open={open}
              onClose={() => setOpen(false)}
              autoHideDuration={3000}
          >
              <Alert severity={errorApi ? "error" : "success"} sx={{ width: '100%' }}>
                  {textSnackbar}
              </Alert>
          </Snackbar>
        </div>
      </React.Fragment>
    );
};

const styles = {
  paragraph: {
    color: '#ee3bd1',
    marginLeft: '0.5%'
  }
}

DescreptionApi.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(DescreptionApi);
