import { thunk } from "easy-peasy";
import Axios from 'axios';
import { API_URL } from "../../utils/config";


const ReviewModel = {
    data: [],
    getReview: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/reviews`)
            getState().data = response.data.data
        } catch (error) {
            console.log(error);
        }
    }),
    create: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.post(`${API_URL}/reviews`, payload.data)
            console.log('response', response);
            getState().data = [...getState().data, response.data.data]
            payload.successHandler()
        } catch (error) {
            console.log(error)
        }
    }),
    update: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.put(`${API_URL}/reviews/${payload.id}`, payload.data)
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
    activeInactive: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.put(`${API_URL}/reviews/activeInactive/${payload.id}/${payload.status}`)
            getState().data = getState().data.map(item => {
                if (item._id === response.data.data._id) {
                    item.status = response.data.data.status
                }
                return item
            })
        } catch (error) {
            console.log(error)
        }
    }),
    remove: thunk(async (action, payload, { getState }) => {
        try {
            await Axios.delete(`${API_URL}/reviews/${payload}`)
            getState().data = getState().data.filter(item => item._id !== payload)
        } catch (error) {
            console.log(error)
        }
    }),
}

export default ReviewModel