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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import apiAxios from "../../services/axios";
import AuthContext from "../../Context/auth";

const gamb = [
  {
    id: 1
  }
]

const OperatorServices = props => {

    //meta title
    document.title="Serviços & Operadora";
    const { logado } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [serviceList, setServiceList] = useState([]);
    //Table
    const [open, setOpen] = useState(true);
    const [listServiceOpen, setListServiceOpen] = useState([]);
    //Pagination
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
      getService();
    }, [page])

    async function getService() {
      setLoading(true);
      try {
        const response = await apiAxios.get(`/apiServicos/get/all/services?page=${page > 0 ? page - 1 : page}`);
        setServiceList(response.data.content);
        setTotalPages(response.data.totalPages);
        setListServiceOpen([]);
        setLoading(false);

      } catch(e) {
        setLoading(false);
      }
    }

    function handleChangePage(_event, value) {
        setPage(value);
    };

    function InfoService(index) {
        if(listServiceOpen.includes(index)) {
          const indexs = listServiceOpen.indexOf(index);
          listServiceOpen.splice(indexs, 1);
        } else {
          listServiceOpen.push(index);
        }
        setListServiceOpen(listServiceOpen);
        setOpen(!open);
    }

    function verifyIndex(index) {
        return listServiceOpen.includes(index);
    }

    function validClick() {
      if(!logado) {
        window.location.href = "/login"
      }
    }

    function getImg(name) {
      return `/img/servicesImg/${name}0.png`;
    }

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={props.t("Serviços & Operadora")}
              breadcrumbItem={props.t("Serviços & Operadora")}
            />
                <div>
                    <h4 style={styles.tituloTable}>Procure o serviço desejado</h4>
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                  <TableRow>
                                      <TableCell />
                                      <TableCell align="left">Icons</TableCell>
                                      <TableCell align="left">Nome</TableCell>
                                      <TableCell align="left">min</TableCell>
                                      <TableCell align="left">Disponivel</TableCell>
                                      <TableCell align="left">price ($)</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                    {serviceList.map((item, index) => (
                                        <React.Fragment key={index}>
                                          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                              <TableCell>
                                                <IconButton
                                                  aria-label="expand row"
                                                  size="small"
                                                  onClick={() => InfoService(index)}
                                                >
                                                  {verifyIndex(index) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                              </TableCell>
                                              <TableCell align="left">
                                                <img src={getImg(item.alias)} alt="naadad" style={{ width: '2rem', height: '2rem'}}/> 
                                              </TableCell>
                                              <TableCell align="left">{item.name}</TableCell>
                                              <TableCell align="left">15</TableCell>
                                              <TableCell align="left">{item.totalQuantity} peças</TableCell>
                                              <TableCell align="left">
                                                R$ {item.defaultPrice}
                                              </TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                              <Collapse in={verifyIndex(index)} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1, border: '1px', borderColor: 'black' }}>
                                                  <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                      <TableRow>
                                                        <TableCell align='right'>Valor mínimo</TableCell>
                                                        <TableCell align='center'></TableCell>
                                                      </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                      {gamb.map((itemGamb, index) => (
                                                        <TableRow key={index}>
                                                          <TableCell align="right">
                                                            {item.defaultPrice}
                                                              {/* <TextField
                                                                  name='quantity'
                                                                  value={quantity}
                                                                  type='number'
                                                                  size='small'
                                                                  onChange={e => setQuantity(e.target.value)}
                                                              /> */}
                                                          </TableCell>
                                                          <TableCell align="center">
                                                            <Button
                                                              variant='contained'
                                                              color='success'
                                                              onClick={validClick}
                                                            >
                                                              COMPRAR
                                                            </Button>
                                                          </TableCell>
                                                        </TableRow>
                                                      ))}
                                                    </TableBody>
                                                  </Table>
                                                </Box>
                                              </Collapse>
                                            </TableCell>
                                          </TableRow>
                                        </React.Fragment >
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div>
                  {
                    loading &&
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 15, marginBottom: 15 }}>
                      <CircularProgress />
                    </div>
                  }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 15 }}>
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      color="primary"
                      page={page == 0 ? 1 : page}
                      onChange={handleChangePage}
                    />
                  </Stack>
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

OperatorServices.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(OperatorServices);
