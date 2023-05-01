import axios from "axios";

const apiAxios = axios.create({
    baseURL: "https://apcodes.top:9081/stubs/handler_api",
    data: {},
    headers: {}
})

const apiApcodesAdm = axios.create({
    baseURL: "https://apcodes.top:9081/stubs/handler_api/adm",
    data: {},
    headers: {}
})

export const apiAxiosHub = axios.create({
    baseURL: "https://digitalapc.xyz:9988/store",
    data: {},
    headers: {},

})

export default apiAxios;