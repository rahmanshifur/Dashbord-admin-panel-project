import Axios from 'axios';
import { thunk, action } from "easy-peasy";
import { navigate } from "@reach/router";
import { API_URL } from './../../utils/config';
import jwt_decode from "jwt-decode";

const AuthModel = {
    isAuth: false,
    user: {},
    token: '',
    profileInformation: {},
    signUp: thunk(async (action, payload) => {
        try {
            let response = await Axios.post(`${API_URL}/users`, payload.data)
            alert(response.data.message)
            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }),
    getProfileInformation: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/users/${getState().user._id}`)
            getState().profileInformation = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),
    profileUpdate: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.put(`${API_URL}/users/${getState().user._id}`, payload.data)
            getState().user = { ...getState().user, ...response.data.data }
            getState().profileInformation = { ...getState().profileInformation, ...response.data.data }
            payload.successHandler()
        } catch (error) {
            console.log(error)
        }
    }),
    login: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.post(`${API_URL}/auth/login`, payload.data)
            if (!response.data?.data) {
                return;
            }
            alert(response.data.message)
            getState().isAuth = true
            getState().user = jwt_decode(response.data.data)
            getState().token = response.data.data
            payload.successHandler()
        } catch (error) {
            alert('Invalid credential!')
            console.log('error', error)
        }
    }),
    logout: action((state, payload) => {
        state.isAuth = false
    }),
    changePassword: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.put(`${API_URL}/users/change-password/${getState().user._id}`, payload.data)
            getState().user = { ...getState().user, ...response.data.data }
            payload.successHandler()
        } catch (error) {
            console.log(error)
        }
    })
}

export default AuthModel
