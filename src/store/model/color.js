import { thunk } from 'easy-peasy';
import Axios from 'axios';
import { API_URL } from './../../utils/config';

const ColorModel = {
    data: [],
    details: {},
    getColor: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/colors`)
            getState().data = response.data.data
        } catch (err) {
            console.log('err', err)
        }
    }),
    getDetails: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/colors/${payload}`)
            getState().details = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),
    create: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.post(`${API_URL}/colors`, payload.data)
            getState().data = [response.data.data, ...getState().data]
            payload.successHandler()
        } catch (err) {
            console.log('err', err)
        }
    }),
    update: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.put(`${API_URL}/colors/${payload.id}`, payload.data)
            getState().data = getState().data.map(item => {
                if (item._id === response.data.data._id) {
                    item = response.data.data
                }
                return item
            })
            payload.successHandler()
        } catch (error) {
            console.log(error)
        }
    }),
    remove: thunk(async (action, payload, { getState }) => {
        try {
            await Axios.delete(`${API_URL}/colors/${payload}`)
            getState().data = getState().data.filter(item => item._id !== payload)
        } catch (error) {
            console.error(error)
        }
    }),
}

export default ColorModel