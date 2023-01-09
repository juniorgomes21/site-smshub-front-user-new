import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//My

const DescreptionApi = props => {

  //meta title
  document.title="Descrição API";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Descrição API")}
            breadcrumbItem={props.t("Descrição API")}
          />
            <div>
              <p>API - é um protocolo entre seu software e nosso servidor. </p>
              <p>API necessária para automatização do processo de recebimento de sms do seu lado </p>
              <p>Todos os pedidos (POST e GET suportados) devem ir para <a style={styles.paragraph} href="#" target="_blank">https://store24h.org/stubs/handler_api.php</a></p>
              <p>O protocolo API é totalmente compatível com sms-activate.ru </p>
              <div style={{ display: 'flex'}}>
                <p>Para substituir o host, você deve gravar no arquivo</p><p style={styles.paragraph}> C:\Windows\System32\drivers\etc\</p>
              </div>
              <p>ATENÇÃO! Se você alterar o host, haverá um erro de protocolo https. Para evitar isso, envie solicitações sem https usando http</p>
              <p>Todas as solicitações devem ter uma chave de API como parâmetro "api_key" "api_key"</p>
            </div>
        </Container>
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
