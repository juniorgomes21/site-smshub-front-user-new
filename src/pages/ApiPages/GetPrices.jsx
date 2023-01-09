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
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AuthContext from "../../Context/auth";

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

function createData(opcao,valores_aceitos,obrigacao, descricao) {
    return { opcao, valores_aceitos, obrigacao, descricao};
}

const rows = [
    createData('CHAVE API', "null", "Sim", "Sua chave de API fornece acesso a serviços pagos. A chave da API deve ser mantida em sigilo"),
    createData('SERVIÇO', "Veja a lista de serviços no menu à esquerda", "Não", "Serviço para o qual você precisa obter"),
    createData('PAÍS', "Veja a lista de países no menu à esquerda", "Não", "Números do país")

];

function createData2(resposta_servidor , descricao) {
    return { resposta_servidor, descricao};
}

const rows2 = [
    createData2('Resposta JSON', "Resposta no formato {Country: {Service: {Price: Quantity}}}"),

];

const GetPrices = props => {
    const { logado, apiKey } = useContext(AuthContext);
  //meta title
  document.title="API getPrices";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("API getPrices")}
            breadcrumbItem={props.t("API getPrices")}
          />
            <div>
                <p>Solicite todos os preços:</p>
                {
                    logado ?
                        <div style={{ display: 'flex' }}>
                            <ArrowForwardIcon />
                            <p style={{ color: '#ee3bd1' }}>{`https://store24hub.org/stubs/handler_api?api_key=${apiKey}&action=getPrices&service=SERVICE&country=73`}</p>
                        </div>
                    :
                        <div style={{ display: 'flex' }}>
                            <ArrowForwardIcon />
                            <p style={{ color: '#ee3bd1' }}>https://store24hub.org/stubs/handler_api?api_key=APIKEY&action=getPrices&service=SERVICE&country=73</p>
                        </div>
                }
                <h4 style={styles.tituloTable}>Parâmetros de entrada</h4>
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
                                {rows.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">{row.opcao}</StyledTableCell>
                                        <StyledTableCell align="left">{row.valores_aceitos}</StyledTableCell>
                                        <StyledTableCell align="left">{row.obrigacao}</StyledTableCell>
                                        <StyledTableCell align="left">{row.descricao}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <h4 style={styles.tituloTable}>Resultado</h4>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Resposta do servidor</StyledTableCell>
                                    <StyledTableCell align="left">Descrição</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows2.map((row, index) => (
                                    <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">{row.resposta_servidor}</StyledTableCell>
                                    <StyledTableCell align="left">{row.descricao}</StyledTableCell>
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
      marginTop: '0.2rem'
    },
    container: {
      display: "flex",
    },
  
    titulo: {
      display: 'flex',
      marginBottom: '2.5rem',
      justifyContent: "center",
    },
  
    tituloTable: {
      display: 'flex',
      marginTop: '2.5rem',
      marginBottom: '2.5rem',
      justifyContent: "center",
    }
  }

GetPrices.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(GetPrices);
