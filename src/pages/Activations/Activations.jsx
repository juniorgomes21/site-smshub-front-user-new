import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { getTokenAsyncStorage } from "../../isValidToken/isValidToken";
import { maskCell } from "../../Validation&Formatation/formatation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ManagerServiceContext from "../../Context/managerService";
import { api, apiAxiosHub } from "../../services/axios";
import AuthContext from "../../Context/auth";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DescreptionApi = props => {

  //meta title
  document.title="Ativação";
  const { apiKey } = useContext(AuthContext);
  const { smsListApi, userAPI, getService } = useContext(ManagerServiceContext);
  const [loading, setLoading] = useState(false);
  //Cancel
  const [indexCancel, setIndexCancel] = useState(-1);
  const [loadingCancel, setLoadingCancel] = useState(false);
  //Conclude
  const [indexConclude, setIndexConclude] = useState(-1);
  const [loadingConclude, setLoadingConclude] = useState(false);
  //ErrorApi
  const [errorMsg, setErrorMsgApi] = useState('Ops, algo deu errado tente novamente!');
  const [errorApi, setErrorApi] = useState(false);
  //SnackBar
  const [state, setState] = useState({
    openSnackBar: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, openSnackBar } = state;

  async function cancelActivation(id, index) {
      try {
          setIndexCancel(index);
          setLoadingCancel(true);
          setErrorApi(false);
          await api.get(`/handler_api?api_key=${apiKey}&action=setStatus&status=8&id=${id}`);
          await userAPI();
          setErrorMsgApi("Ativação cancelada!");
          setLoadingCancel(false);
          getService();
          handleClickSnackBar({vertical: 'top', horizontal: 'center'});
      } catch(e) {
          setErrorApi(true);
          setLoadingCancel(false);
          handleClickSnackBar({vertical: 'top', horizontal: 'center' });
      }
  }

  async function concludeActivation(id, index) {
      try {
          setIndexConclude(index);
          setLoadingConclude(true);
          setErrorApi(false);
          await api.get(`/handler_api?api_key=${apiKey}&action=setStatus&status=6&id=${id}`);
          await userAPI();
          setErrorMsgApi("Ativação concluida!");
          setLoadingConclude(false);
          handleClickSnackBar({vertical: 'top', horizontal: 'center'});

      } catch(e) {
          setErrorApi(true);
          setLoadingConclude(false);
          handleClickSnackBar({vertical: 'top', horizontal: 'center' });
      }
  }
  
  async function retrySmsActivation(id, index) {
      try {
          setIndexConclude(index);
          setIndexConclude(true);
          setErrorApi(false);
          const respose = await api.get(`/handler_api?api_key=${apiKey}&action=setStatus&status=3&id=${id}`);
          if(respose.data != "ACCESS_RETRY_GET") {
              setErrorApi(true);
              setIndexConclude(false);
              handleClickSnackBar({vertical: 'top', horizontal: 'center'});
          }
          await userAPI();
          setErrorMsgApi("Reenvie o sms!");
          setIndexConclude(false);
          handleClickSnackBar({vertical: 'top', horizontal: 'center'});
      } catch(e) {
      }
  }

  function handleClickSnackBar(newState) {
      setState({ openSnackBar: true, ...newState });
  };
  
  function handleCloseSnackBar() {
      setState({ ...state, openSnackBar: false });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Ativação")}
            breadcrumbItem={props.t("Ativação")}
          />
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '5rem'}}>
                <p style={{ fontWeight: 'bold' }}>
                    API
                </p>
            </div>
            {
              smsListApi.length == 0 ?
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <p>
                    Você não tem ativações ativas feita pela API
                </p>
              </div>
            :
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} aria-label="caption table">
                  <TableHead>
                      <TableRow>
                          <TableCell align="center">ID</TableCell>
                          <TableCell align="center">Serviço</TableCell>
                          <TableCell align="center">Número</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Código SMS</TableCell>
                          <TableCell align="center">Tempo</TableCell>
                          <TableCell align="center">Ação</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {smsListApi.map((smsDTO, index) => (
                          <TableRow key={index}>
                              <TableCell align="center">
                                  {
                                      smsDTO.idActivation
                                  }
                              </TableCell>
                              <TableCell align="center">
                                  <img style={{ width: '2rem', height: '2rem' }} src={`/img/servicesImg/${smsDTO.aliasService}0.png`} alt="..." />
                              </TableCell>
                              <TableCell align="center">
                                  {
                                      maskCell(smsDTO.numberActivation)
                                  }
                              </TableCell>
                              <TableCell align="center">
                                  {
                                      smsDTO.status
                                  }
                              </TableCell>
                              <TableCell align="center">
                                  {
                                      smsDTO.smsList.length == 0 ?
                                          <CircularProgress size={30}/>
                                      :
                                          smsDTO.smsList[0]
                                  }
                              </TableCell>
                              <TableCell align="center">
                                  {
                                      smsDTO.min + " min"
                                  }
                              </TableCell>
                              <TableCell align="center">
                                  {
                                      !smsDTO.finalized && smsDTO.retry == false ?
                                          loadingCancel && index == indexCancel ?
                                              <CircularProgress size={30} color="error"/>
                                          :
                                              <Button
                                                  variant="contained"
                                                  color="error"
                                                  onClick={() => cancelActivation(smsDTO.idActivation, index)}
                                              >
                                                  <CloseIcon />
                                              </Button>
                                      :
                                          <>
                                              {
                                                  loadingConclude && index == indexConclude ?
                                                      <CircularProgress size={30} color="primary"/>
                                                  :   
                                                      <>
                                                          <Button
                                                              variant="contained"
                                                              color="success"
                                                              sx={{ ml: 1, mt: 1 }}
                                                              onClick={() => concludeActivation(smsDTO.idActivation, index)}
                                                          >
                                                              <CheckIcon />
                                                          </Button>
                                                          {smsDTO.awaitSms == false &&
                                                              <Button
                                                                  variant="contained"
                                                                  color="primary"
                                                                  sx={{ ml: 1, mt: 1 }}
                                                                  onClick={() => retrySmsActivation(smsDTO.idActivation, index)}
                                                              >
                                                                  <ReplayIcon />
                                                              </Button>
                                                          }
                                                      </>
                                              }
                                          </>
                                  }
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
                  </Table>
              </TableContainer>
            }
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
              { errorMsg }
          </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

DescreptionApi.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(DescreptionApi);
