import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';



export default function AxiosInterceptor() {

    // Request

    axios.interceptors.request.use(request => updateHeader(request));

    // Response
    axios.interceptors.response.use(response => {
        console.log(response);
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });

}

function updateHeader(request: InternalAxiosRequestConfig) {
    const token = Cookies.get('auth-token');
    console.log("TOKEN ENVIADO" + token);

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
}