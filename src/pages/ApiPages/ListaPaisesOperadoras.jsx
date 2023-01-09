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
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
    border: 0,
    },
}));

function createData(id, nome,pais, operadorasDisponiveis) {
    return { id, nome, pais, operadorasDisponiveis};
}

const rows = [
    createData('0', "Rússia", "Rússia", "aiva, qualquer, beeline, center2m, danycom, ezmobile, lycamobile, matrix, megafon, motiv, mts, mtt, mtt_virtual, rostelecom, sber, simsim, tele2, tinkoff, ttk, winmobile, yota"),
    createData('1', "Ucrânia", "Ucrânia", "3mob, qualquer, intertelecom, kyivstar, vida, lycamobile, mts, utel, vodafone"),
    createData('2', "Cazaquistão", "Cazaquistão", "activ, altel, qualquer, beeline, kcell, tele2"),
    createData('3', "China", "China", "qualquer, chinamobile, china_unicom, unicom"),
    createData('4', "Filipinas", "Filipinas", "qualquer, globe_telecom, smart, tm"),
    createData('5', "Mianmar", "Mianmar", "qualquer, ooredoo, telenor"),
    createData('6', "Indonésia", "Indonésia", "qualquer, eixo, indosat, smartfren, telkomsel, três"),
    createData('7', "Malásia", "Malásia", "qualquer, celcom, digi, hotlink, u_mobile, xox"),
    createData('8', "Quênia", "Quênia", "airtel, qualquer, econet, laranja, safaricom, telkom"),
    createData('9', "Tanzânia", "Tanzânia", "airtel, qualquer, tigo, vodacom"),
    createData('10', "Vietnã", "Vietnã", "qualquer, itelecom, mobifone, vietnamobile, viettel, vinaphone"),
    createData('11', "Quirguistão", "quirguistão", "any, beeline, megacom, o!"),
    createData('12', "EUA (virtual)", "cervo", "qualquer, celular, móvel"),
    createData('13', "Israel", "Israel", "019mobile, any, golan_telecom, home_cellular, hot_mobile, jawwal, ooredoo, orange, pelephone, rami_levy"),
    createData('14', "Hong Kong", "Hong Kong", "qualquer, chinamobile, csl_mobile, imc, smartone, três, unicom"),
    createData('15', "Polônia", "Polônia", "aero2, qualquer, e_telko, key, lycamobile, netia, orange, play, plus, tmobile")

];

const ListaPaisesOperadoras = props => {

  //meta title
  document.title="API listaPaisesOperadoras";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("API lista_Paises_Operadoras")}
            breadcrumbItem={props.t("API lista_Paises_Operadoras")}
          />
            <div>
                <h1 style={styles.titulo}>Importante! Na solicitação da API, especifique o ID do país, não o nome.</h1>
                <h1 style={{ marginTop: '2%' }}>Parâmetros de entrada</h1>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Opção</StyledTableCell>
                                    <StyledTableCell align="left">Valores aceitos</StyledTableCell>
                                    <StyledTableCell sx={{ width: '7%' }}>Obrigação</StyledTableCell>
                                    <StyledTableCell align="left">Descrição</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                    <StyledTableCell align="left">{row.nome}</StyledTableCell>
                                    <StyledTableCell align="left">{row.pais}</StyledTableCell>
                                    <StyledTableCell align="left">{row.operadorasDisponiveis}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
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
  },
  container: {
    display: "flex",
  },

  titulo: {
    display: 'flex',
    marginBottom: '5%',
    color: 'red',
    justifyContent: "center",
  }
}

ListaPaisesOperadoras.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ListaPaisesOperadoras);
