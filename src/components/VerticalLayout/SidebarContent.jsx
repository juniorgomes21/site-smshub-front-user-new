import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

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
import AccountBox from '@mui/icons-material/AccountBox';
import Article from '@mui/icons-material/Article';
import Sms from '@mui/icons-material/Sms';
import Settings from '@mui/icons-material/Settings';

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
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
    ref.current.recalculate()
  })

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

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/app/store24h">
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
                  <Link to="/app/store24h/API/APIprotocoldescription">{props.t("API protocol description")}</Link>
                </li>
                <li>
                  <Link to="/app/store24h/API/getNumberStatus">
                    {props.t("getNumbersStatus")}
                  </Link>
                </li>
                <li>
                  <Link to="/app/store24h/API/getBalance">{props.t("getBalance")}</Link>
                </li>
                <li>
                  <Link to="/app/store24h/API/getNumber">{props.t("getNumber")}</Link>
                </li>
                <li>
                  <Link to="/app/store24h/API/setStatus">{props.t("setStatus")}</Link>
                </li>
                <li>
                  <Link to="/app/store24h/API/getStatus">{props.t("getStatus")}</Link>
                </li>
                <li>
                  <Link to="/app/store24h/API/getPrices">{props.t("getPrices")}</Link>
                </li>
                <li>
                  <Link to="/app/store24h/API/listaPaisesOperadoras">
                    {props.t("Lista de países e operadoras")}
                  </Link>
                </li>
                <li>
                  <Link to="/app/store24h/API/listaServicos">
                    {props.t("Lista de serviços")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/app/store24h/API/operatorServices" className="">
                <AccountBox sx={{ marginRight: '8px' }}/>
                <span>{props.t("Serviços")}</span>
              </Link>
            </li>

            <li>
              <Link to="/app/store24h/history" >
                <Article sx={{ marginRight: '8px' }}/>
                <span>{props.t("History")}</span>
              </Link>
            </li>
            <li>
              <Link to="/app/store24h/activations" >
                <Sms sx={{ marginRight: '8px' }}/>
                <span>{props.t("Ativações")}</span>
              </Link>
            </li>
            <li>
              <Link to="/app/store24h/configurations" >
                <Settings sx={{ marginRight: '8px' }}/>
                <span>{props.t("Configurações")}</span>
              </Link>
            </li>
          </ul>
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
