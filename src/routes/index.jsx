import React from "react";
import { Redirect } from "react-router-dom";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// // Dashboard
import Dashboard from "../pages/Dashboard/index";
import DescreptionApi from "../pages/ApiPages/DescreptionApi";
import GetNumberStatus from "../pages/ApiPages/GetNumberStatus";
import Balance from "../pages/ApiPages/Balancer";
import GetNumber from "../pages/ApiPages/GetNumber";
import SetStatus from "../pages/ApiPages/SetStatus";
import GetStatus from "../pages/ApiPages/GetStatus";
import GetPrices from "../pages/ApiPages/GetPrices";
import ListaPaisesOperadoras from "../pages/ApiPages/ListaPaisesOperadoras";
import ListaServicos from "../pages/ApiPages/ListaServicos";

import OperatorServices from "../pages/OperatorServices/OperatorServices";
import History from "../pages/History/History";
import Activations from "../pages/Activations/Activations";
import Configurations from "../pages/ConfigurationsPage/Configurations";

const authProtectedRoutes = [
  { path: "/app/store24h/history", component: History },
  { path: "/app/store24h/activations", component: Activations },
  { path: "/", exact: true, component: () => <Redirect to="/app/store24h" /> },
];

const publicRoutes = [
  { path: "/app/store24h", component: Dashboard },
  { path: "/app/store24h/API/APIprotocoldescription", component: DescreptionApi },
  { path: "/app/store24h/API/getStatus", component: GetStatus },
  { path: "/app/store24h/API/getPrices", component: GetPrices },
  { path: "/app/store24h/API/listaPaisesOperadoras", component: ListaPaisesOperadoras },
  { path: "/app/store24h/API/listaServicos", component: ListaServicos },
  { path: "/app/store24h/API/getNumberStatus", component: GetNumberStatus },
  { path: "/app/store24h/API/getBalance", component: Balance },
  { path: "/app/store24h/API/getNumber", component: GetNumber },
  { path: "/app/store24h/API/setStatus", component: SetStatus },
  { path: "/app/store24h/configurations", component: Configurations },
  { path: "/app/store24h/API/operatorServices", component: OperatorServices },

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  
];

export { authProtectedRoutes, publicRoutes };
