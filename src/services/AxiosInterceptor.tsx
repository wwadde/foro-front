import axios, { InternalAxiosRequestConfig } from "axios";


export default function AxiosInterceptor() {

    axios.interceptors.request.use(request => updateHeader(request));

    axios.interceptors.response.use(response => {
        console.log(response);
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });

}

function updateHeader(request: InternalAxiosRequestConfig) {
    const token = localStorage.getItem('token');

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
}