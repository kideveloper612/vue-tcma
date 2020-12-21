import axios from 'axios';
import router from "@/router";

const http = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json',
        'Content-Type': 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, 
function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use((response) => {
    return response.data
 }, function (error) {
    if(error.response.status === 401) {
        router.push({name: 'sessions.signin'});
    }
    return Promise.reject(error.response);
 });


export default http