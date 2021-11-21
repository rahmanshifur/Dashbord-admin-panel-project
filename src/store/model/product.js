
import Axios from 'axios';
import { thunk } from 'easy-peasy';
import { API_URL } from './../../utils/config';

const ProductModel = {
    data: [],
    details: {},
    getProduct: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/products`)
            getState().data = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),
    getDetails: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/products/${payload}`)
            getState().details = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),
    getSearch: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/products/getBySearch${payload}`)
            getState().data = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),

    getCatId: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/products/getByCatId/${payload}`)
            console.log(response)
            getState().data = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),

    getScatId: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/products/getBySubCatId/${payload}`)
            console.log(response)
            getState().data = response.data.data
        } catch (error) {
            console.log(error)
        }
    }),
    create: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.post(`${API_URL}/products`, payload.data)
            getState().data = [response.data.data, ...getState().data]
            payload.successHandler()
        } catch (error) {
            console.error(error)
        }
    }),
    update: thunk(async (action, payload, { getState }) => {
        console.log('payload', payload)
        try {
            let response = await Axios.put(`${API_URL}/products/${payload.id}`, payload.data)
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
            await Axios.delete(`${API_URL}/products/${payload}`)
            getState().data = getState().data.filter(item => item._id !== payload)
        } catch (error) {
            console.log(error)
        }
    }),
}
export default ProductModel