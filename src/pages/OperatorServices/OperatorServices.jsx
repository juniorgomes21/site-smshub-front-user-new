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

const OperatorServices = props => {

  //meta title
  document.title="Serviços & Operadora";

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
                <div>
                    assim que fizer o login do user
                </div>
                <div>
                    <h4 style={styles.tituloTable}>Procure o serviço desejado</h4>
                </div>
                {/* <div>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="left">Icons</TableCell>
                                    <TableCell align="left">Nome</TableCell>
                                    <TableCell align="left">min</TableCell>
                                    <TableCell align="left">Disponivel</TableCell>
                                    <TableCell align="left">Total price ($)</TableCell>
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
                                                onClick={() => setOpen(!open)}
                                            >
                                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                            </TableCell>
                                            <TableCell align="left">
                                            <img src={getImg(item.alias)} alt="naadad" style={{ width: '2rem', height: '2rem'}}/> 
                                            </TableCell>
                                            <TableCell align="left">{item.name}</TableCell>
                                            <TableCell align="left">min</TableCell>
                                            <TableCell align="left">Disponíveis 2 peças</TableCell>
                                            <TableCell align="left">
                                            R$ 10,00
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography variant="h6" gutterBottom component="div">
                                                History
                                                </Typography>
                                                <Table size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                    <TableCell>Disponivel</TableCell>
                                                    <TableCell>Total price ($)</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="right">Disponíveis 2 peças</TableCell>
                                                        <TableCell align="right">
                                                        R$ 10,00
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
                </div> */}
                {/* <div>
                  {
                    loading &&
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 15, marginBottom: 15 }}>
                      <CircularProgress />
                    </div>
                  }
                </div> */}
                {/* <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 15 }}>
                  <Stack spacing={2}>
                    <Pagination count={totalPages} color="primary" page={page == 0 ? 1 : page} onChange={handleChangePage}/>
                  </Stack>
                </div> */}
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
