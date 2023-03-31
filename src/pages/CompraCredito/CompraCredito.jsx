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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AuthContext from "../../Context/auth";
import apiAxios from "../../services/axios";
import CircularProgress from "@mui/material/CircularProgress";

const CompraCredito = props => {
  const { token, logado } = useContext(AuthContext);
  //meta title
  document.title="Comprar de Crédito";

  const [loading, setLoading] = useState(false);
  const [credito, setCredito] = useState(0);
  const [selectCredito, setSelectCredito] = useState(0);
  const [erroApi, setErroApi] = useState(false);

  useEffect(() => {
      getInfosCredito();
  }, [])

  async function getInfosCredito() {
    try {
      const response = await apiAxios.get('/getCredito', { headers: {'Authorization' : `Bearer ${token}`}});
      setCredito(response.data.credito);
      setLoading(false);
    } catch(e) {
      setLoading(false);
      console.log("error getInfosCredito", e);
    }
  }

  async function comprarCredito() {
    try {
      setLoading(true);
      await apiAxios.post('/comprarCredito', { "creditoParaAdicionar" : selectCredito }, { headers: {'Authorization' : `Bearer ${token}`}});
      getInfosCredito();
    } catch(e) {
      setErroApi(true);
      setLoading(false);
      setErroApi(false);
      console.log("error comprarCredito");
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Comprar de Crédito")}
            breadcrumbItem={props.t("Comprar_Crédito")}
          />
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '20%', justifyContent: 'center'}}>
                      <h2>Valor do crédito:</h2>
                      <div style={{ display: 'flex' }}>
                        <TextField
                          name='quantity'
                          value={selectCredito}
                          type='number'
                          size='small'
                          sx={{ width: '160px !important' }}
                          onChange={e => setSelectCredito(e.target.value)}
                        />
                        {
                            loading ?
                              <div style={{ marginLeft: '1rem' }}>
                                <CircularProgress />
                              </div>
                          :
                              <Button
                                variant="contained"
                                onClick={comprarCredito}
                                sx={{ ml: '1rem', width: '40%' }}
                              >
                                  Comprar
                              </Button>
                        }
                      </div>
                      {
                          erroApi &&
                            <div style={{ display: 'flex', width: '100%' }}>
                              <p style={{ color: 'red' }}>
                                Valor inválido!
                              </p>
                            </div>
                      }
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' , width: '20%'}}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '5rem'}}>
                          <h4 >Crédito disponível:</h4>
                          <h4 style={{ marginLeft: '1rem'}}>{credito}</h4>
                      </div>
                  </div>
              </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

CompraCredito.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(CompraCredito);
