import Axios from "axios"
import { thunk, action } from "easy-peasy"
import { API_URL } from "../../utils/config"


const UserModel = {
    data: [],
    details: {},
    editData: {},
    getUser: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/users`)
            getState().data = response.data.data
        } catch (error) {
            console.error(error)
        }
    }),
    getDetails: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.get(`${API_URL}/users/${payload}`)
            getState().details = response.data.data
        } catch (error) {
            console.log('error', error)
        }
    }),
    create: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.post(`${API_URL}/users`, payload.data)
            getState().data = [response.data.data, ...getState().data]
            getState().editData = {}
            payload.successHandler()
        } catch (err) {
            console.log('err', err)
        }
    }),
    edit: thunk(async (action, payload, { getState }) => {
        // getState().editData = getState().data.filter(item => item._id === payload)[0]
        try {
            let response = await Axios.get(`${API_URL}/users/${payload}`)
            getState().editData = response.data.data
        } catch (err) {
            console.log('err', err)
        }
    }),
    resetEdit: action((state, payload) => {
        state.editData = {}
    }),
    update: thunk(async (action, payload, { getState }) => {
        try {
            let response = await Axios.put(`${API_URL}/users/${payload.id}`, payload.data)
            getState().data = getState().data.map(item => {
                if (item._id === response.data.data._id) {
                    item = response.data.data
                }
                return item
            })
            getState().editData = {}
        } catch (err) {
            console.log('err', err)
        }
    }),
    remove: thunk(async (action, payload, { getState }) => {
        try {
            await Axios.delete(`${API_URL}/users/${payload}`)
            getState().data = getState().data.filter(item => item._id !== payload)
        } catch (error) {
            console.error(error)
        }
    }),
}
export default UserModel