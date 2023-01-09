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
    createData('CHAVE API', "null", "Sim", "Sua chave de API fornece acesso a serviços pagos. A chave da API deve ser mantida em sigilo"),
    createData('ID ', "Valor numérico", "Sim", "Ativação de ID recebida ao solicitar um número"),
    createData('STATUS', "1 - SMS sent to the number, 3 - SMS needs to be repeated, 6 - activation completed successfully, 8 - cancel activation", "Sim", "O status a ser transferido para ativação")

];

function createData2(resposta_servidor, descricao) {
    return { resposta_servidor, descricao};
}

const rows2 = [
    createData2('ACCESS_READY', "Prontidão de espera de SMS"),
    createData2('ACCESS_RETRY_GET', "Esperamos um novo SMS"),
    createData2('ACCESS_ACTIVATION', "Ativação concluída com sucesso"),
    createData2('ACCESS_CANCEL', "Ativação cancelada")

];

function createData3(resposta_servidor, descricao) {
    return { resposta_servidor, descricao};
}

const rows3 = [
    createData3('BAD_ACTION', "Consulta geral malformada"),
    createData3('BAD_SERVICE', "nome de serviço incorreto "),
    createData3('BAD_KEY', "Chave de API inválida"),
    createData3('NO_ACTIVATION', "ID de ativação não existe"),
    createData3('ERROR_SQL', "Erro no banco de dados do servidor SQL, entre em contato com seu administrador")

];

const SetStatus = props => {

  //meta title
  document.title="API setStatus";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("API setStatus")}
            breadcrumbItem={props.t("API set_Status")}
          />
            <div>
                <p style={styles.paragraph}>Qual é o status quando enviar?</p>
                <p style={styles.paragraph}>Lógica simples para interagir com a API </p>
                <p style={styles.paragraph}>As seguintes ações estão disponíveis imediatamente após o recebimento do número:</p>
                <p style={styles.paragraph}>8 - Cancelar ativação</p>
                <p style={styles.paragraph}>1 - Notificar que o SMS foi enviado (opcional)</p>
                <p style={styles.paragraph}>Para ativação com status 1:</p>
                <p style={styles.paragraph}>8 - Cancelar ativação</p>
                <p style={styles.paragraph}>Imediatamente após receber o código:</p>
                <p style={styles.paragraph}>3 - Solicitar outro SMS</p>
                <p style={styles.paragraph}>6 - Confirme o código SMS e conclua a ativação</p>
                <p style={styles.paragraph}>Para ativação com status 3:</p>
                <p style={styles.paragraph}>6 - Confirme o código SMS e conclua a ativação</p>

                <p style={{ marginTop: '3%' }}>Alterar status:</p>
                <div style={{ display: 'flex' }}>
                    <ArrowForwardIcon />
                    <p style={styles.paragraph}>https://store24hub.org/stubs/handler_api?api_key=APIKEY&action=setStatus&status=STATUS&id=ID</p>
                </div>
                <h4 style={styles.tituloTable}>Parâmetros de entrada</h4>
                <div className='flex w-11/12'>
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
                                    <StyledTableCell align="left">Exemplo</StyledTableCell>
                                    <StyledTableCell align="left">Descrição</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows2.map((row, index) => (
                                    <StyledTableRow key={index}>
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
        marginLeft: '0.5%'
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

SetStatus.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(SetStatus);
