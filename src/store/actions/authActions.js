import {store} from "../index";
import $authHost from "../../utils/axios";
import { auth, setUser } from '../reducers/userReducer';

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

export const confirm = async (data) => {
    await $authHost.post('/auth/confirm', data).then(async (res) => {
        if (res.data?.token) {
            await localStorage.setItem('accessToken', res.data.token);
            window.location.reload();
        }
    })
}

export const reset = async (data) => {
    await $authHost.post('/auth/reset', data)
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
