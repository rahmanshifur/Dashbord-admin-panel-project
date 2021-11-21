import { thunk, action } from "easy-peasy";
import Axios from 'axios';
import { API_URL } from "../../utils/config";


const SizeModel = {
    data: [],
    details: {},
    editData: {},
    getSize: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/sizes`)
            getState().data = response.data.data
        } catch (error) {
            console.log(error);
        }
    }),
    getDetails: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/sizes/${payload}`)
            getState().details = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),
    create: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.post(`${API_URL}/sizes`, payload.data)
            getState().data = [response.data.data, ...getState().data]
            payload.successHandler()
        } catch (error) {
            console.log(error);
        }
    }),
    edit: thunk(async (action, payload, { getState }) => {
        console.log(payload)
        try {
            let response = await Axios.get(`${API_URL}/sizes/${payload}`)
            console.log('response', response.data.data)
            getState().editData = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),
    update: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.put(`${API_URL}/sizes/${payload.id}`, payload.data)
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
    resetEdit: action((state, payload) => {
        state.editData = {}
    }),
    remove: thunk(async (action, payload, { getState }) => {
        try {
            await Axios.delete(`${API_URL}/sizes/${payload}`)
            getState().data = getState().data.filter(item => item._id !== payload)
        } catch (error) {
            console.log(error)
        }
    }),
}

export default SizeModel

