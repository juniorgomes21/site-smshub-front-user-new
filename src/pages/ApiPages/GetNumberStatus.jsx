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
  createData('PAÍS', "Veja a lista de países no menu à esquerda ", "Não", "País do número, se não for definido, o número do último país selecionado no menu esquerdo será selecionado < /td>"),
  createData('OPERADOR', "A lista de operadores disponíveis pode ser encontrada no menu esquerdo do respectivo país ", "Não", "Operador do número, se não for especificado, o último operador selecionado no menu esquerdo será selecionado"),
];

const GetNumberStatus = props => {
  const { logado, apiKey } = useContext(AuthContext);

  //meta title
  document.title="API getNumberStatus";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("API get-Number-Status")}
            breadcrumbItem={props.t("API get_Number_Status")}
          />
            {
              logado ?
                  <div style={{ display: 'flex' }}>
                      <ArrowForwardIcon />
                      <p style={{ color: '#ee3bd1' }}>{`https://store24hub.org/stubs/handler_api?api_key=${apiKey}&action=getNumbersStatus&country=COUNTRY&operator=73`}</p>
                  </div>
              :
                  <div style={{ display: 'flex' }}>
                      <ArrowForwardIcon />
                      <p style={{ color: '#ee3bd1' }}>https://store24hub.org/stubs/handler_api?api_key=APIKEY&action=getNumbersStatus&country=COUNTRY&operator=73</p>
                  </div>
            }
            <h1 style={{ marginTop: '2%' }}>Parâmetros de entradax</h1>
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
            <p style={{ marginTop: '2%' }}>A resposta do serviço estará no formato json, exemplo: </p>
            <div style={{ display: 'flex' }}>
                <ArrowForwardIcon />
                <p style={styles.paragraph}> {'{'} "vk_0":148,"ok_0":135,"wa_0":91,"vi_0":209,"tg_0":83,"wb_0":206,"go_0":83,"av_0":68,"fb_0":177,"tw_0":149 {'}'}</p>
            </div>
            <p>Onde antes do traço está o nome do serviço, após a designação se deve habilitar o encaminhamento. 0 - não inclui. 1 - habilitar. Infelizmente, ainda não fornecemos números com encaminhamento</p>
        </Container>
      </div>
    </React.Fragment>
  );
};

const styles = {
  paragraph: {
    color: '#ee3bd1',
    marginTop: '0.2rem'
  }

}

GetNumberStatus.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(GetNumberStatus);
