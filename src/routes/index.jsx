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
import ActivityService from "../pages/ActivityService/ActivityService";
import OperatorServices from "../pages/OperatorServices/OperatorServices";
import History from "../pages/History/History";
import Activations from "../pages/Activations/Activations";
import Configurations from "../pages/ConfigurationsPage/Configurations";

const authProtectedRoutes = [
  { path: "/app/history", component: History },
  { path: "/app/activations", component: Activations },
  { path: "/app/CompraCredito", component: CompraCredito },
  { path: "/app/activityService", component: ActivityService },
  // { path: "/app/income", component: Income },
  { path: "/", exact: true, component: () => <Redirect to="/app" /> },
];

const publicRoutes = [
  { path: "/app", component: Dashboard },
  { path: "/app/API/APIprotocoldescription", component: DescreptionApi },
  { path: "/app/API/getStatus", component: GetStatus },
  { path: "/app/API/getPrices", component: GetPrices },
  { path: "/app/API/listaServicos", component: ListaServicos },
  { path: "/app/API/getNumberStatus", component: GetNumberStatus },
  { path: "/app/API/getBalance", component: Balance },
  { path: "/app/API/getNumber", component: GetNumber },
  { path: "/app/API/setStatus", component: SetStatus },
  { path: "/app/configurations", component: Configurations },
  { path: "/app/API/operatorServices", component: OperatorServices },

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  
];

export { authProtectedRoutes, publicRoutes };
