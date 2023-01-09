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
    createData('ID', "Valor numérico", "Sim", "ID de ativação obtido ao solicitar um número ")

];

function createData2(resposta_servidor , descricao) {
    return { resposta_servidor, descricao};
}

const rows2 = [
    createData2('STATUS_WAIT_CODE', "Estamos aguardando a chegada de SMS"),
    createData2('STATUS_WAIT_RETRY:LASTCODE', "Aguardamos outro SMS LASTCODE - último sms recebido"),
    createData2('STATUS_CANCEL', "ativação cancelada"),
    createData2('STATUS_OK:CODE', "Código recebido (onde CODE - código de ativação)"),

];

function createData3(resposta_servidor, descricao) {
    return { resposta_servidor, descricao};
}

const rows3 = [
    createData3('BAD_ACTION', "Consulta geral malformada"),
    createData3('BAD_KEY', "Chave de API inválida"),
    createData3('NO_ATIVATION', "ID de ativação não existe"),
    createData3('ERROR_SQL', "Erro no banco de dados do servidor SQL, entre em contato com seu administrador"),
];

const GetStatus = props => {
    const { logado, apiKey } = useContext(AuthContext);
  //meta title
  document.title="API getStatus";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("API getStatus")}
            breadcrumbItem={props.t("API get_Status")}
          />
                <div>
                    <p>Obter status:</p>
                    {
                    logado ?
                        <div style={{ display: 'flex' }}>
                            <ArrowForwardIcon />
                            <p style={{ color: '#ee3bd1' }}>{`https://store24hub.org/stubs/handler_api?api_key=${apiKey}&action=getBalance`}</p>
                        </div>
                    :
                        <div style={{ display: 'flex' }}>
                            <ArrowForwardIcon />
                            <p style={{ color: '#ee3bd1' }}>https://store24hub.org/stubs/handler_api?api_key=APIKEY&action=getBalance</p>
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

GetStatus.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(GetStatus);
