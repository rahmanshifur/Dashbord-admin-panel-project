import { thunk } from "easy-peasy";
import Axios from 'axios';
import { API_URL } from './../../utils/config';

const OrderModel = {
    data: [],
    details: {},
    getOrder: thunk(async (action, payload, { getState, getStoreState }) => {
        try {
            let response = await Axios.get(`${API_URL}/orders`, { headers: { 'Authorization': getStoreState().auth.token } })
            getState().data = response.data.data
        } catch (e) {
            console.log(e)
        }
    }),
    getDetails: thunk(async (action, payload, { getState, getStoreState }) => {
        console.log('payload', payload)
        try {
            let response = await Axios.get(`${API_URL}/orders/${payload}`, { headers: { 'Authorization': getStoreState().auth.token } })
            // console.log('response', response.data.data)
            getState().details = response.data.data
        } catch (e) {
            console.log(e)
        }
    }),
    myOrder: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/orders/myOrder`)
            getState().data = response.data.data
        } catch (e) {
            console.log(e)
        }
    }),
    remove: thunk(async (action, payload, { getState, getStoreState }) => {
        try {
            await Axios.delete(`${API_URL}/orders/${payload}`, { headers: { 'Authorization': getStoreState().auth.token } })
            getState().data = getState().data.filter(item => item._id !== payload)
        } catch (e) {
            console.log(e)
        }
    }),
    orderHandler: thunk(async (action, { id, status }, { getState, getStoreState }) => {
        try {
            await Axios.put(`${API_URL}/orders/changeStatus/${id}/${status}`, { headers: { 'Authorization': getStoreState().auth.token } })
            getState().data = getState().data.map(item => {
                if (item._id === id) {
                    item.status = status
                }
                return item;
            })
        } catch (e) {
            console.log(e)
        }
    })
}

export default OrderModel