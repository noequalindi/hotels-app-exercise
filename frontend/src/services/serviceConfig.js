const axios = require('axios');
const baseUrl = "http://localhost:3001/api"

const AxiosInstance = axios.create({
    baseURL: `${baseUrl}`,
    timeout: `${process.env.SET_TIMEOUT}`,
    headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});


export const setHeaders = (type, props) => {
    AxiosInstance.defaults.headers.common = {};
    props.forEach((prop) => {
        AxiosInstance.defaults.headers.common[prop.key] = prop.value;
    });
}

export default AxiosInstance;