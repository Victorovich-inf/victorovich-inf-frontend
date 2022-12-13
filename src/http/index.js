import axios from "axios";

const $host = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

const $authHost = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
});


const authIntterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
};


$authHost.interceptors.request.use(authIntterceptor);


export {$host, $authHost};
export * from "./CRUD";
