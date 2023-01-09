import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'boss-api/dummy/brand';
import { PapperBlock } from 'boss-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import logo from '../../../img/logo_mir.jpg';
import mastercard from '../../../img/_mastercard-securecode.png';
import visa from '../../../img/_Visa.png';
import mIRaccept from '../../../img/MIRaccept.png';
import mastercardLogo from '../../../img/Mastercard-logo.svg.png';
import verified from '../../../img/_verified-by-visa.png';
import { container } from 'webpack';

function BlankPage() {
  const title = brand.name + ' - Página Inicial';
  const description = brand.desc;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Página Inicial" desc="">
        <div>
            <h1 style={styles.titulo}>Store24h - Números virtuais para verificação de conta com os preços mais baixos</h1>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Comprando números virtuais e recebendo SMS no modo automático</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Os preços mais baixos para números virtuais com um sistema inovador --hubFREE--</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Um grande número de números virtuais de alta qualidade para receber mensagens 24 horas por dia, 7 dias por semana</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Grande variedade de operadoras móveis e prefixos de mais de 100 países</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Interface amigável, pesquisa por país e serviço facilita a compra de um número de celular</p>

            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Receberemos SMS de quaisquer serviços e sites que exijam o registro de uma conta por SMS</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> O número de serviço é vendido apenas uma vez. Não vendemos números de segunda rodada</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Mensagens ilimitadas para alugar um número virtual por 20 minutos</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Compatibilidade total com a API sms-activate.ru</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> Se o número não recebeu a mensagem, o dinheiro é devolvido ao saldo</p>
            </div>
            <div style={styles.container}>
                <ArrowForwardIosIcon/>
                <p> A compra de serviços da holding Mail.ru e Mamba é possível com um saldo mínimo de 500 rublos</p>
            </div>
        </div>
        <div>
            <div className='flex'>
                <h1 style={styles.tituloFooter}>Você tem um cartão SIM? Oferecemos parceria! Obtenha renda agora!</h1>
            </div>
            <div style={styles.containerFooter}>
                <div style={styles.containerImg}>
                    <img src={verified} alt="verified"/>
                </div>
                <div style={styles.containerImg}>
                    <img src={mastercard} alt="mastercard"/>
                </div>
                <div style={styles.containerImg}>
                    <img src={visa} alt="visa" />
                </div>
                <div style={styles.containerImg}>
                    <img src={logo} alt="logo" />
                </div>
                <div style={styles.containerImg}>
                    <img src={mIRaccept} alt="mIRaccept"/>
                </div>
                <div style={styles.containerImg}>
                    <img src={mastercardLogo} alt="mastercardLogo"/>
                </div>
            </div>
        </div>
      </PapperBlock>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
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
    width: '40%',
    alignItems: 'center',
    marginTop: '5%',
  },

  containerImg: {
    width: '20%'
  }
}

export default BlankPage;
