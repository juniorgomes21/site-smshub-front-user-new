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

function createData(id, nome) {
    return { id, nome};
}

const rows = [
    createData('Ok.ru', "vk"),
    createData('Whatsapp', "OK"),
    createData('Viber', "do"),
    createData('Telegram', "nós"),
    createData('WeChat', "tg"),
    createData('Google,youtube,Gmail', "wb"),
    createData('avito', "vai"),
    createData('facebook', "do"),
    createData('Twitter', "fb"),
    createData('Uber', "tw"),
    createData('Киви', "u"),
    createData('Gett', "qw"),
    createData('OLX', "gt"),
    createData('Вконтакте', "sn"),
    createData('Instagram', "ig"),
    createData('Hezzl', "ss")

];

const ListaServicos = props => {

  //meta title
  document.title="API Lista de serviços";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("API Lista de serviços")}
            breadcrumbItem={props.t("API Lista de serviços")}
          />
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TableContainer component={Paper} style={{ width: '70%' }}>
                        <Table sx={{ minWidth: 500 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Id</StyledTableCell>
                                    <StyledTableCell style={{ width: '50%' }} align="center">Nome</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">{row.id}</StyledTableCell>
                                        <StyledTableCell align="center">{row.nome}</StyledTableCell>
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
    justifyContent: "center",
  }
}

ListaServicos.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ListaServicos);
