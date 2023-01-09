import axios from "axios";

const apiAxios = axios.create({
    baseURL: "https://apcodes.top:9081/stubs/handler_api",
    data: {},
    headers: {}
})

export default apiAxios;