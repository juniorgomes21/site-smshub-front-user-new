import PropTypes from "prop-types"
import React, { useEffect, useRef, useState, useContext } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

//My
import KeyIcon from '@mui/icons-material/Key';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountBox from '@mui/icons-material/AccountBox';
import Article from '@mui/icons-material/Article';
import Sms from '@mui/icons-material/Sms';
import Settings from '@mui/icons-material/Settings';
import ManagerServiceContext from "../../Context/managerService"
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { CircularProgress } from "@mui/material"
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

const SidebarContent = props => {
  const { serviceList, compraServico } = useContext(ManagerServiceContext);
  
  const ref = useRef();

  const [indexClick, setIndexClick] = useState(-1);
  const [loading, setLoading] = useState(false);
  //Search
  const [searchText, setSearchText] = useState('');
  const [serviceFilter, setServiceFilter] = useState([]);


  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    
  }, [serviceList])

  useEffect(() => {
    ref.current.recalculate()
  })

  useEffect(() => {
    searchService(searchText);
  }, [searchText])

  function searchService(textoDigitado) {
    const serviceFilter = serviceList.filter( e => e.name.toLowerCase().includes(textoDigitado.toLowerCase()));
    setServiceFilter(serviceFilter);
  }

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  function formatPrice(price) {
    let priceString = 'R$ ' + price?.toFixed(2);

    return priceString;
  }

  function getImg(name) {
    return `/img/servicesImg/${name}0.png`;
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref} style={{ background: '#0703ad' }}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/app">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <KeyIcon sx={{ marginRight: '8px' }}/>
                <span>{props.t("Api")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/app/API/APIprotocoldescription">{props.t("API protocol description")}</Link>
                </li>
                <li>
                  <Link to="/app/API/getNumberStatus">
                    {props.t("getNumbersStatus")}
                  </Link>
                </li>
                <li>
                  <Link to="/app/API/getBalance">{props.t("getBalance")}</Link>
                </li>
                <li>
                  <Link to="/app/API/getNumber">{props.t("getNumber")}</Link>
                </li>
                <li>
                  <Link to="/app/API/setStatus">{props.t("setStatus")}</Link>
                </li>
                <li>
                  <Link to="/app/API/getStatus">{props.t("getStatus")}</Link>
                </li>
                <li>
                  <Link to="/app/API/getPrices">{props.t("getPrices")}</Link>
                </li>
                <li>
                  <Link to="/app/API/listaServicos">
                    {props.t("Lista de serviços")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/app/CompraCredito" >
                <AddShoppingCartIcon sx={{ marginRight: '8px' }}/>
                <span>{props.t("Comprar Crédito")}</span>
              </Link>
            </li>
            <li>
              <Link to="/app/activityService" >
                <MiscellaneousServicesIcon sx={{ marginRight: '8px' }}/>
                <span>{props.t("Serviços")}</span>
              </Link>
            </li>
            <li>
              <Link to="/app/history" >
                <Article sx={{ marginRight: '8px' }}/>
                <span>{props.t("Histórico")}</span>
              </Link>
            </li>
            <li>
              <Link to="/app/activations" >
                <Sms sx={{ marginRight: '8px' }}/>
                <span>{props.t("Ativações")}</span>
              </Link>
            </li>
            <li>
              <Link to="/app/configurations" >
                <Settings sx={{ marginRight: '8px' }}/>
                <span>{props.t("Configurações")}</span>
              </Link>
            </li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
          Lista de Serviços
        </div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '29ch' },
          }}
          noValidate
          autoComplete="off"
        >
            <TextField
              id="outlined-basic"
              label=""
              placeholder="Pesquisar"
              variant="outlined"
              size="small"
              onChange={e => {
                setSearchText(e.target.value);
                setIndexClick(-1);
              }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                '& label.Mui-focused': {
                  color: '#000',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#000',
                  },
                  '&:hover fieldset': {
                    borderColor: '#000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                  },
                },
              }}
            />
        </Box>
        {
          serviceList.length > 0 ?
            searchText.length > 0 ?
              serviceFilter.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    width: '14.8rem',
                    height: '3.3rem',
                    background: '#d3d3d3',
                    marginLeft: '0.35rem',
                    marginBottom: '0.5rem',
                    alignItems: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ marginLeft: '0.2rem'}}>
                    <img
                      src={getImg(item.alias)}
                      alt="nd"
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        maxWidth: '1.5rem'
                      
                        }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      height: '100%',
                      alignContent: 'center',
                      marginLeft: '0.3rem',
                      alignItems: 'center'
                    }}
                    onClick={() => {
                      if(index == indexClick) {
                        setIndexClick(-1);
                      } else {
                        setIndexClick(index)
                      }
                    }
                    }
                  >
                    <p
                      style={{
                        margin: 0,
                        color: 'black',
                        fontSize: '12px',
                        minWidth: '87px',
                        maxWidth: '88px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.name}
                    </p>
                    {
                      indexClick != index && 
                        <p
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            margin: 0,
                            color: 'black',
                            fontSize: '10px',
                            minWidth: '52px',
                            maxWidth: '80px'
                            }}
                        >
                            {item.totalQuantity} pcs.
                        </p>
                    }
                    {
                      indexClick == index ?
                      <div>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            ml: 0.5,
                            mr: 0.8,
                            fontSize: '12px',
                          }}
                          onClick={() => 
                            compraServico(item.alias)
                          }
                        >
                          {
                            loading ?
                              <CircularProgress
                                size={23}
                              />
                            :
                              'Comprar'
                          }
                        </Button>
                      </div>
                      :
                        <p
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginRight: '0.3rem',
                            marginBottom: 0,
                            color: 'black',
                            width: '4rem',
                            fontSize: '12px'
                          }}>
                            {formatPrice(item.price)}
                        </p>
                    }
                  </div>
                </div>
              ))
            :
              serviceList.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    width: '14.8rem',
                    height: '3.3rem',
                    background: '#d3d3d3',
                    marginLeft: '0.35rem',
                    marginBottom: '0.5rem',
                    alignItems: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ marginLeft: '0.2rem'}}>
                    <img
                      src={getImg(item.alias)}
                      alt="nd"
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        maxWidth: '1.5rem'
                      
                        }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      height: '100%',
                      alignContent: 'center',
                      marginLeft: '0.3rem',
                      alignItems: 'center'
                    }}
                    onClick={() => {
                      if(index == indexClick) {
                        setIndexClick(-1);
                      } else {
                        setIndexClick(index)
                      }
                    }
                    }
                  >
                    <p
                      style={{
                        margin: 0,
                        color: 'black',
                        fontSize: '12px',
                        minWidth: '87px',
                        maxWidth: '88px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.name}
                    </p>
                    {
                      indexClick != index && 
                        <p
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            margin: 0,
                            color: 'black',
                            fontSize: '10px',
                            minWidth: '52px',
                            maxWidth: '80px'
                            }}
                        >
                            {item.totalQuantity} pcs.
                        </p>
                    }
                    {
                      indexClick == index ?
                      <div>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            ml: 0.5,
                            mr: 0.8,
                            fontSize: '12px',
                          }}
                          onClick={() => 
                            compraServico(item.alias)
                          }
                        >
                          {
                            loading ?
                              <CircularProgress
                                size={23}
                              />
                            :
                              'Comprar'
                          }
                        </Button>
                      </div>
                      :
                        <p
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginRight: '0.3rem',
                            marginBottom: 0,
                            color: 'black',
                            width: '4rem',
                            fontSize: '12px'
                          }}>
                            {formatPrice(item.price)}
                        </p>
                    }
                  </div>
                </div>
              ))
          :
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                  <CircularProgress
                    size={20}
                    color="warning"
                  />
              </div>
            </>
        }
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
