import { action, thunk } from "easy-peasy"
import Axios from 'axios';
import { API_URL } from './../../utils/config';
import { navigate } from '@reach/router';


const CartModel = {
    data: [],
    create: action((state, payload) => {
        state.data.unshift(payload)
        alert('Product add to cart successfully!')
    }),
    update: action((state, payload) => {
        state.data = payload
        alert('Product has been update successfully')
    }),
    removeProduct: action((state, payload) => {
        state.data = state.data.filter(item => item._id !== payload)
    }),
    cartEmpty: action((state, payload) => {
        state.data = []
    }),
    submitOrder: thunk(async (action, payload, { getState, getStoreState }) => {
        if (getState().data.length === 0) return;


        let products = []
        getState().data.forEach(element => {
            products.push({ _id: element._id, quantity: Number(element.quantity) })
        });

        try {
            let response = await Axios.post(`${API_URL}/orders`, { products }, { headers: { 'Authorization': getStoreState().auth.token } })
            getState().data = []
            console.log(response.data.data)
            alert(response.data.message)
            navigate('/')
        } catch (err) {
            console.log('err', err)
        }
    })
}
export default CartModel




