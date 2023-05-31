import React from "react";
import { Redirect } from "react-router-dom";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import CompraCredito from "../pages/CompraCredito/CompraCredito";
// // Dashboard
import Dashboard from "../pages/Dashboard/index";
import DescreptionApi from "../pages/ApiPages/DescreptionApi";
import GetNumberStatus from "../pages/ApiPages/GetNumberStatus";
import Balance from "../pages/ApiPages/Balancer";
import GetNumber from "../pages/ApiPages/GetNumber";
import SetStatus from "../pages/ApiPages/SetStatus";
import GetStatus from "../pages/ApiPages/GetStatus";
import GetPrices from "../pages/ApiPages/GetPrices";
import ListaServicos from "../pages/ApiPages/ListaServicos";
import Income from "../pages/Income/Income";

import OperatorServices from "../pages/OperatorServices/OperatorServices";
import History from "../pages/History/History";
import Activations from "../pages/Activations/Activations";
import Configurations from "../pages/ConfigurationsPage/Configurations";

const authProtectedRoutes = [
  { path: "/app/hub24h/history", component: History },
  { path: "/app/hub24h/activations", component: Activations },
  { path: "/app/hub24h/CompraCredito", component: CompraCredito },
  { path: "/app/hub24h/income", component: Income },
  { path: "/", exact: true, component: () => <Redirect to="/app/hub24h" /> },
];

const publicRoutes = [
  { path: "/app/hub24h", component: Dashboard },
  { path: "/app/hub24h/API/APIprotocoldescription", component: DescreptionApi },
  { path: "/app/hub24h/API/getStatus", component: GetStatus },
  { path: "/app/hub24h/API/getPrices", component: GetPrices },
  { path: "/app/hub24h/API/listaServicos", component: ListaServicos },
  { path: "/app/hub24h/API/getNumberStatus", component: GetNumberStatus },
  { path: "/app/hub24h/API/getBalance", component: Balance },
  { path: "/app/hub24h/API/getNumber", component: GetNumber },
  { path: "/app/hub24h/API/setStatus", component: SetStatus },
  { path: "/app/hub24h/configurations", component: Configurations },
  { path: "/app/hub24h/API/operatorServices", component: OperatorServices },

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  
];

export { authProtectedRoutes, publicRoutes };
