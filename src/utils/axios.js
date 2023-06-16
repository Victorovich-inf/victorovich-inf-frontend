import axios from 'axios';
import { HOST_API } from '../config';


const $authHost = axios.create({
    baseURL: `${HOST_API}`,
});

const authIntterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
};

$authHost.interceptors.request.use(authIntterceptor);

$authHost.interceptors.response.use(
    (response) => response,
);

export default $authHost;
