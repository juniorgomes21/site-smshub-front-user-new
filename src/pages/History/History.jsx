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
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button } from '@mui/material';

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

const DescreptionApi = props => {
    const [value, setValue] = useState(dayjs('2023-01-01T00:00:00'));
    const [loading, setLoading] = useState(true);

    //meta title
    document.title="Histórico";

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
        <div className="page-content">
            <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
                title={props.t("Histórico")}
                breadcrumbItem={props.t("Histórico")}
            />
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '2.5rem' , marginBottom: '2.5rem'}}>
                        <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', marginRight: 10  }}>
                            <p style={{ marginRight: 10 }}>Data da tradução:</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        label="Date&Time picker"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                            <p style={{ marginRight: 10 }}>Data da tradução:</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        label="Date&Time picker"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <Button
                            variant='contained'
                            sx={{ ml: 5, maxHeight: '50px' }}
                            size='small'
                        >
                            SOLICITAR
                        </Button>
                    </div>
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">Date</StyledTableCell>
                                        <StyledTableCell align="left">Service</StyledTableCell>
                                        <StyledTableCell align="left">Number</StyledTableCell>
                                        <StyledTableCell align="left">Sms</StyledTableCell>
                                        <StyledTableCell align="left">Cost</StyledTableCell>
                                        <StyledTableCell align="left">Status</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {rows.map((row) => ( */}
                                        <StyledTableRow>
                                            <StyledTableCell component="th" scope="row">"Em desenvolvimento"</StyledTableCell>
                                            <StyledTableCell align="left">"Em desenvolvimento"</StyledTableCell>
                                            <StyledTableCell align="left">"Em desenvolvimento"</StyledTableCell>
                                            <StyledTableCell align="left">"Em desenvolvimento"</StyledTableCell>
                                            <StyledTableCell align="left">"Em desenvolvimento"</StyledTableCell>
                                            <StyledTableCell align="left">"Em desenvolvimento"</StyledTableCell>
                                        </StyledTableRow>
                                    {/* ))} */}
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
  }
}

DescreptionApi.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(DescreptionApi);