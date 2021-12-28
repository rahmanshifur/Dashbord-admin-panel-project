import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Col, Row, Input } from 'reactstrap';
import noImg from '../../assets/img/no-img.png'
import { Link } from '@reach/router';
import { useEffect, useState } from 'react';


function ShoppingCart() {

    const updateProductQuantity = useStoreActions(action => action.cart.update)
    const removeProductHandler = useStoreActions(action => action.cart.removeProduct)
    const removeAllCartHandler = useStoreActions(action => action.cart.cartEmpty)
    const isAuth = useStoreState(state => state.auth.isAuth)
    const pdtData = useStoreState(state => state.cart.data)


    const [cartData, setCartData] = useState([])


    useEffect(() => {
        setCartData(pdtData)
    }, [pdtData])



    function totalCal() {
        let total = 0
        if (cartData && cartData.length) {
            cartData.forEach(item => {
                total += item.quantity * item.price
            })
        }
        return total
    }



    function quantityChangeHandler(quantity, pdtId) {
        let arr = cartData.map(item => {
            if (item._id === pdtId) {
                item.quantity = Number(quantity) || 0
            }
            return item;
        })
        setCartData(arr)
    }



    return (
        <div>
            <Row>
                <Col sm={9}>
                    <h3><b>Shopping Cart</b></h3>
                    <hr />
                    {cartData.length !== 0 && cartData.map((item) =>
                        <div key={item._id} className='cart-items'>
                            <div className="cart-items-list">
                                <div className="body">
                                    <div className="pdt-items border-bottom py-3 ">
                                        <div className="pdt-info d-flex justify-content-between">
                                            <div className="img d-flex">
                                                <img src={noImg} alt="" width="150" height="auto" />
                                                <div className="details ps-4 ">
                                                    <Link to='/#blank'>{item.title}</Link>
                                                    <div className="quantity-wrapper pt-4">
                                                        <Input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => quantityChangeHandler(e.target.value, item._id)}
                                                            style={{ width: 75 }}
                                                        />
                                                        <Button type='button' onClick={() => item.quantity > 0 && updateProductQuantity(cartData)}>U</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="price float-end">
                                                <i class="fa fa-times float-end" style={{ cursor: 'pointer' }} onClick={() => removeProductHandler(item._id)}></i>
                                                <p className="pt-5">${item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    <div className="mt-4">
                        <Button className='w-50 btn-danger border-0 rounded-0' onClick={() => removeAllCartHandler()}>Delete</Button>
                        <Link to={isAuth ? '/checkout' : '/login'} className='btn btn-warning w-50 border-0 rounded-0'>Checkout</Link>
                    </div>
                </Col>
                <Col sm={3}>
                    <h3 className='mt-5'><b>Cart totals</b></h3>
                    <div className='bg-light p-3'>
                        <div className="d-flex border-bottom">
                            <p className='fs-5'>SubTotal:</p>
                            <p className='text-danger fs-4 ms-auto'>$0</p>
                        </div>
                        <div className="d-flex border-bottom">
                            <p className='fs-5'>Delivery Fee:</p>
                            <p className='text-danger fs-4 ms-auto'>$0</p>
                        </div>
                        <div className=' d-flex align-items-center'>
                            <p className='fs-4'>Ground Total:</p>
                            <p className='text-danger fs-4 ms-auto'>${totalCal()}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div >
    )
}
export default ShoppingCart