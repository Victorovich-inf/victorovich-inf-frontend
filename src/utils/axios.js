import axios from 'axios';
import { HOST_API } from '../config';


const $authHost = axios.create({
    baseURL: `${HOST_API}/api`,
});


$authHost.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default $authHost;
