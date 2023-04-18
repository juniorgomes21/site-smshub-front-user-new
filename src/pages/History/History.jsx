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
import { Button, CircularProgress } from '@mui/material';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiAxios, { apiAxiosHub } from "../../services/axios";
import { getTokenAsyncStorage } from "../../isValidToken/isValidToken";
import { formatarDataDia, formatarDataHora, maskCell, maskMoney } from '../../Validation&Formatation/formatation';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import Pagination from '@mui/material/Pagination';

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
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(dayjs('2023-01-01T00:00:00'));
    const [listServicos, setListServicos] = useState([]);
    //Pagination
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getListCompras();
    }, [page])

    async function getListCompras() {
        try {
            setLoading(true);
            const token = await getTokenAsyncStorage();
            const response = await apiAxios.get(`/apiServicos/getComprasFeitas?page=${page > 0 ? page - 1 : page}`, { headers: { 'Authorization' : `Bearer ${token}`}});
            setListServicos(response.data.content);
            setTotalPages(response.data.totalPages);
            setLoading(false);

        } catch(e) {
            console.log("error getListCompras", e);
            setLoading(false);
        }
    }

    function formatDate(date) {

        const datex = formatarDataDia(date);
        const horus = formatarDataHora(date);

        return ( datex + " " + horus);
    }

    function StatusEmoji(status) {
        if(status == "-1" || status == "1" || status == "3") {
            return ( //neutro
                <SentimentNeutralIcon
                    sx={{
                        color: "blue"
                    }}
                />
            )
        } else if(status == "6" || status == "7") {
            return( //neutro
                <InsertEmoticonOutlinedIcon
                    sx={{
                        color: "green"
                    }}
                />
            )
        } else {
            return( //triste
                <SentimentDissatisfiedOutlinedIcon
                    sx={{
                        color: "red"
                    }}
                />
            )
        }
    }

    //meta title
    document.title="Histórico";

    function handleChange(newValue) {
        setValue(newValue);
    };

    function handleChangePage(_event, value) {
        setPage(value);
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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">#</StyledTableCell>
                                <StyledTableCell align="center">Dia da compra</StyledTableCell>
                                <StyledTableCell align="center">Service</StyledTableCell>
                                <StyledTableCell align="center">Número alugado</StyledTableCell>
                                <StyledTableCell align="center">SMS</StyledTableCell>
                                <StyledTableCell align="center">Custo</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    listServicos.length == 0 ?
                                        null
                                    :

                                    listServicos.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="center">{row.idActivation}</StyledTableCell>
                                            <StyledTableCell align="center">{formatDate(row.localDateTime)}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <img style={{ width: '2rem', height: '2rem' }} src={`/img/servicesImg/${row.aliasService}0.png`} alt="..." />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{maskCell(row.number)}</StyledTableCell>
                                            <StyledTableCell align="center">{row.sms}</StyledTableCell>
                                            <StyledTableCell align="center">{maskMoney(row.cost ? row.cost : 0)}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {
                                                    StatusEmoji(row.status)
                                                }
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {
                        listServicos.length == 0 ?
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', fontSize: '1.2rem', width: '100%' }}>
                                {
                                    loading ?
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <CircularProgress
                                            
                                            />
                                        </div>
                                    :
                                        <p>Você ainda não comprou nenhum serviço!</p>
                                }
                            </div>
                        :

                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3rem' }}>
                            <Stack spacing={2}>
                                <Pagination count={totalPages} color="primary" page={page == 0 ? 1 : page} onChange={handleChangePage}/>
                            </Stack>
                        </div>
                    }
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