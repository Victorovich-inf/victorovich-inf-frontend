import {store} from "../index";
import $authHost from "../../utils/axios";
import { auth, logout, setUser } from '../reducers/userReducer';
import { setSession } from '../../utils/jwt';

const {dispatch} = store


export const loginAction = async (data) => {
    await $authHost.post('/auth/login', data).then(async (res) => {
        if (res.data?.token) {
            await localStorage.setItem('accessToken', res.data.token);
            window.location.reload();
        }
    })
}

export const register = async (data) => {
    await $authHost.post('/auth/complete', data).then(async (res) => {
        if (res.data?.token) {
            await localStorage.setItem('accessToken', res.data.token);
            await dispatch(setUser(res.data.user))
            await dispatch(auth());
        }
    })
}

export const loginVK = async (data) => {
    await $authHost.get('/auth/vkontakte', data).then(async (res) => {
        if (res.data?.token) {
            await localStorage.setItem('accessToken', res.data.token);
            await dispatch(setUser(res.data.user))
            await dispatch(auth());
        }
    })
}

export const logoutAction = async () => {
    localStorage.removeItem('accessToken');
    await dispatch(logout());
}

export const getMy = async () => {
    return new Promise((resolve, reject) => {
        $authHost.get('/auth/check').then(async (res) => {
            resolve({
                user: res?.data?.user
            })
        }).catch(reject)
    })
}
