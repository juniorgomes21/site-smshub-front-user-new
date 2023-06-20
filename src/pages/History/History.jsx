import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
} from "reactstrap";
import "./style.css"
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
import ptBR from 'date-fns/locale/pt-BR';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiAxios, { apiAxiosHub } from "../../services/axios";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getTokenAsyncStorage } from "../../isValidToken/isValidToken";
import { formatarDataDia, formatarDataHora, maskCell, maskMoney } from '../../Validation&Formatation/formatation';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    //meta title
    document.title="Histórico";
    const [loading, setLoading] = useState(true);
    const [filterHistory, setFilterHistory] = useState(false);
    const [dateInitial, setDateInitial] = useState(dayjs('2023-01-01T00:00:00'));
    const [dateFinal, setDateFinal] = useState(dayjs(Date.now()));

    const [listServicos, setListServicos] = useState([]);
    //Pagination
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    //Date
    const [errorDate, setErrorDate] = useState(false);
    const [msgErrorDate, setMsgErrorDate] = useState('');

    useEffect(() => {
        if(filterHistory) {
            apiFilterDate();
        } else {
            getListCompras();
        }
    }, [page, size])

    async function getListCompras() {
        try {
            setLoading(true);
            const token = await getTokenAsyncStorage();
            const response = await apiAxios.get(`/apiServicos/getComprasFeitas?page=${page > 0 ? page - 1 : page}&size=${size}`, {headers: {'Authorization' : `Bearer ${token}`}});
            setListServicos(response.data.content);
            setTotalPages(response.data.totalPages);
            setLoading(false);

        } catch(e) {
            setLoading(false);
        }
    }

    async function apiDateFilter() {
        try {
            if(!filterHistory) {
                setPage(0);
            }
            setLoading(true);
            setFilterHistory(true);
            const token = await getTokenAsyncStorage();
            const obj = {
                dateInitial: String(dateInitial),
                dateFinal: String(new Date(dateFinal))
            }
            const response = await apiAxios.post(`/apiServicos/getComprasFeitas/hub/filter?page=${page > 0 ? page - 1 : page}&size=${size}`, obj, {headers: {'Authorization' : `Bearer ${token}`}});
            setListServicos(response.data.content);
            setTotalPages(response.data.totalPages);
            setLoading(false);

        } catch(e) {
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

    function handleChangePage(_event, value) {
        setPage(value);
    };

    function changeDateInitial(newValue) {
        setDateInitial(newValue);
        setErrorDate(false);
    };

    function changeDateFinal(newValue) {
        setDateFinal(newValue);
        setErrorDate(false);
    };

    function apiFilterDate() {
        var data1 = new Date(dateInitial);
        var data2 = new Date(dateFinal);

        if (data1 < data2) {
            apiDateFilter();
        } else {
            if (data1 > data2) {
                setMsgErrorDate("A data inicial é maior do que a data final!");
            } else {
                setMsgErrorDate("As datas são iguais!");
            }
            setErrorDate(true);
        }
    }

    const handleChangeSize = (event) => {
        setSize(event.target.value);
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
                    {
                        errorDate &&
                            <div className="bg-green-500">
                                <p style={{ color: "red"}}>{msgErrorDate}</p>
                            </div>
                    }
                    <div className="containerSize">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Exibir</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={size}
                                label="Exibir"
                                onChange={handleChangeSize}
                            >
                                <MenuItem value={10}>10 por página</MenuItem>
                                <MenuItem value={50}>50 por página</MenuItem>
                                <MenuItem value={100}>100 por página</MenuItem>
                                <MenuItem value={200}>200 por página</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="containerDate">
                        <div className="inputInitial">
                            <p style={{ marginRight: 10 }}>Data de inicio:</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        label="Inicial"
                                        views={['year', 'day', 'hours', 'minutes', 'seconds']}
                                        format="dd/MM/yyyy HH:mm"
                                        value={dateInitial}
                                        maxDate={Date.now()}
                                        onChange={changeDateInitial}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className="inputFinal">
                            <p style={{ marginRight: 10 }}>Data do fim:</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        label="final"
                                        format={ptBR}
                                        value={dateFinal}
                                        maxDate={Date.now()}
                                        onChange={changeDateFinal}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className="button">
                            <Button
                                variant='contained'
                                size='small'
                                onClick={apiFilterDate}
                            >
                                SOLICITAR
                            </Button>
                        </div>
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
                                    loading ?
                                        null
                                    :
                                        listServicos.length != 0 &&

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
                        {
                            loading &&
                                <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "1rem", marginBottom: "1rem"}}>
                                    <CircularProgress />
                                </div>
                        }
                    </TableContainer>
                    {
                            listServicos.length == 0 ?
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', fontSize: '1.2rem', width: '100%' }}>
                                    {
                                        filterHistory ?
                                            <p>Você não comprou nenhum serviço nesse período!</p>
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