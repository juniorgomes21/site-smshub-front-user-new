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
  document.title="Ativação";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Ativação")}
            breadcrumbItem={props.t("Ativação")}
          />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p>
                    Você não tem ativações ativas 
                </p>
                <p>
                    Para solicitar um número, selecione um serviço no painel à esquerda e clique no botão Solicitar um número.
                </p>
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
