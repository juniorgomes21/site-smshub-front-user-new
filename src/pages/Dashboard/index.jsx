import PropTypes from "prop-types";
import React from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import logo from '/img/logo_mir.jpg';
import mastercard from '/img/_mastercard-securecode.png';
import visa from '/img/_Visa.png';
import mIRaccept from '/img/MIRaccept.png';
import mastercardLogo from '/img/Mastercard-logo.svg.png';
import verified from '/img/_verified-by-visa.png';

const Dashboard = props => {

  //meta title
  document.title="Página Inicial";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Página Inicial")}
            breadcrumbItem={props.t("Página Inicial")}
          />
          <div>
            <h1 style={styles.titulo}>Store24h - Números virtuais para verificação de conta com os preços mais baixos</h1>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Comprando números virtuais e recebendo SMS no modo automático</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Os preços mais baixos para números virtuais com um sistema inovador --hubFREE--</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Um grande número de números virtuais de alta qualidade para receber mensagens 24 horas por dia, 7 dias por semana</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Grande variedade de operadoras móveis e prefixos de mais de 100 países</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Interface amigável, pesquisa por país e serviço facilita a compra de um número de celular</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Receberemos SMS de quaisquer serviços e sites que exijam o registro de uma conta por SMS</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> O número de serviço é vendido apenas uma vez. Não vendemos números de segunda rodada</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Mensagens ilimitadas para alugar um número virtual por 20 minutos</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Compatibilidade total com a API sms-activate.ru</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> Se o número não recebeu a mensagem, o dinheiro é devolvido ao saldo</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p style={styles.paragraph}> A compra de serviços da holding Mail.ru e Mamba é possível com um saldo mínimo de 500 rublos</p>
            </div>
          </div>
          <div>
              <div className='flex'>
                  <h1 style={styles.tituloFooter}>Você tem um cartão SIM? Oferecemos parceria! Obtenha renda agora!</h1>
              </div>
              <div style={styles.containerFooter}>
                  <div style={styles.containerImg}>
                      <img style={styles.img} src={verified} alt="verified"/>
                  </div>
                  <div style={styles.containerImg}>
                      <img style={styles.img} src={mastercard} alt="mastercard"/>
                  </div>
                  <div style={styles.containerImg}>
                      <img style={styles.img} src={visa} alt="visa" />
                  </div>
                  <div style={styles.containerImg}>
                      <img style={styles.img} src={logo} alt="logo" />
                  </div>
                  <div style={styles.containerImg}>
                      <img style={styles.img} src={mIRaccept} alt="mIRaccept"/>
                  </div>
                  <div style={styles.containerImg}>
                      <img style={styles.img} src={mastercardLogo} alt="mastercardLogo"/>
                  </div>
              </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  paragraph: {
    marginTop: '0.2rem',
    marginBottom: 0,
  },
  titulo: {
    display: 'flex',
    marginBottom: '5%',
    justifyContent: "center",
  },

  tituloFooter: {
    display: 'flex',
    marginTop: '5%',
    marginBottom: '5%',
    justifyContent: "center",
  },

  containerFooter: {
    display: 'flex',
    width: '10  0%',
    justifyContent: 'space-evenly',
    marginTop: '5%',
  },
  containerImg: {
    display: 'flex',
    justifyContent: ''
  },
  img: {
    width: '10rem',
    height: '5rem'
  }
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
