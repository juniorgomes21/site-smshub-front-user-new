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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import AuthContext from '../../../api/Context/auth';
// import { getApiKeyAsyncStorage } from '../../../api/isValidToken/isValidToken';

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

function createData(opcao, valores_aceitos, obrigacao, descricao) {
    return { opcao, valores_aceitos, obrigacao, descricao};
}

const rows = [
    createData('CHAVE API', "Veja a lista de serviços", "Sim", "Sua chave de API fornece acesso a serviços pagos. A chave da API deve ser mantida em sigilo"),
    createData('SERVIÇO ', "Os parâmetros aceitos dependem do país específico, para esclarecimento, preste atenção no menu à esquerda", "Sim", "Serviço para o qual você precisa obter"),
    createData('OPERADOR', "A lista de operadores disponíveis pode ser encontrada no menu esquerdo do respectivo país ", "Não", "Operadora de celular cujo número você precisa obter"),
    createData('PAÍS ', "Veja a lista de países no menu à esquerda", "Não", "Número do país para obter"),

];

function createData2(resposta_servidor , exemplo, descricao) {
    return { resposta_servidor ,exemplo, descricao};
}

const rows2 = [
    createData2('NO_NUMBERS', "NO_NUMBERS", "Não há números com os parâmetros especificados, tente novamente mais tarde ou altere a operadora, o país."),
    createData2('NO_BALANCE', "NO_BALANCE", "A chave da API ficou sem dinheiro"),
    createData2('WRONG_SERVICE', "WRONG_SERVICE", "Identificador de serviço inválido"),
    createData2('ACCESS_NUMBER:ID:NUMBER', "ACCESS_NUMBER:234242:79123456789", "Recebeu um número, ID de ativação - ID, número próprio com código do país - NUMBER")

];

function createData3(resposta_servidor, descricao) {
    return { resposta_servidor, descricao};
}

const rows3 = [
    createData3('BAD_KEY', "Chave de API inválida"),
    createData3('ERROR_SQL', "erro SQL-server"),
    createData3('BAD_ACTION', "Consulta geral malformada"),
    createData3('BAD_SERVICE', "nome de serviço incorreto ")

];

const GetNumber = props => {

  //meta title
  document.title="API getNumber";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("API getNumber")}
            breadcrumbItem={props.t("API get_Number")}
          />
            <div>
                {/* {
                    logado ?
                        <div style={{ display: 'flex' }}>
                            <ArrowForwardIcon />
                            <p style={{ color: '#ee3bd1' }}>{`https://store24hub.org/stubs/handler_api?api_key=${apiKey}&action=getNumber&service=SERVICE&operator=OPERATOR&country=73`}</p>
                        </div>
                    :
                        <div style={{ display: 'flex' }}>
                            <ArrowForwardIcon />
                            <p style={{ color: '#ee3bd1' }}>https://store24hub.org/stubs/handler_api?api_key=APIKEY&action=getNumber&service=SERVICE&operator=OPERATOR&country=73</p>
                        </div>
                } */}
                <div style={{ display: 'flex' }}>
                    <ArrowForwardIcon />
                    <p style={styles.paragraph}>https://store24hub.org/stubs/handler_api?api_key=APIKEY&action=getNumber&service=SERVICE&operator=OPERATOR&country=73</p>
                </div>
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
                                {rows.map((row) => (
                                    <StyledTableRow key={row.opcao}>
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
                                    <StyledTableCell align="left">Exemplo</StyledTableCell>
                                    <StyledTableCell align="left">Descrição</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows2.map((row) => (
                                    <StyledTableRow key={row.exemplo}>
                                    <StyledTableCell component="th" scope="row">{row.resposta_servidor}</StyledTableCell>
                                    <StyledTableCell align="left">{row.exemplo}</StyledTableCell>
                                    <StyledTableCell align="left">{row.descricao}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <h4 style={styles.tituloTable}>Possíveis Erros</h4>
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
                                {rows3.map((row) => (
                                    <StyledTableRow key={row.resposta_servidor}>
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
  tituloTable: {
    marginTop: '2.5rem',
    marginBottom: '2.5rem'
  }
}

GetNumber.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(GetNumber);
