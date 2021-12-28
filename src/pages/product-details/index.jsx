import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Input, InputGroup, Row, Button, Form } from 'reactstrap';
import NoImg from '../../assets/img/no-img.png'
import Review from '../review';

function ProductDetails(props) {

    const [quantity, setQuantity] = useState(0)

    const getDetails = useStoreActions(action => action.product.getDetails)
    const getColor = useStoreActions(action => action.color.getColor)
    const getSize = useStoreActions(action => action.size.getSize)
    const addToCart = useStoreActions(action => action.cart.create)
    const updateCart = useStoreActions(action => action.cart.update)


    const cartData = useStoreState(state => state.cart.data)
    const details = useStoreState(state => state.product.details)
    const colorData = useStoreState(state => state.color.data)
    const sizeData = useStoreState(state => state.size.data)
    const isAuth = useStoreState(state => state.auth.isAuth)

    // console.log('cartData', cartData)
    // console.log('details', details)

    useEffect(() => {
        if (sizeData.length === 0) {
            getSize()
        }
        if (colorData.length === 0) {
            getColor()
        }
        getDetails(props.id)

        if (cartData && quantity === 0 && cartData.length !== 0 && Object.keys(details).length !== 0) {
            setQuantity(cartData.filter(item => item._id == details._id)[0]?.quantity || 0)
        }

    }, [props, getDetails, getColor])


    function addToCartHandler(item) {
        if (quantity <= 0 || quantity >= 50) {
            alert('Please provide a valid quantity!')
            return
        }

        if (!cartData || cartData.length === 0) {
            item.quantity = quantity
            addToCart(item)
            return
        }

        let checkPdt = cartData.filter(pdt => pdt._id === item._id)
        if (checkPdt.length === 0) {
            item.quantity = quantity
            addToCart(item)
            return
        }

        console.log(item, cartData)

        let arr = checkPdt.map(p => {
            if (p._id === item._id) {
                p.quantity = quantity
            }
            return p;
        })
        updateCart(arr)


    }

    return (
        <div>
            {Object.keys(details).length !== 0 &&
                <div>
                    <h4>Product Details</h4>
                    <hr />
                    <Row>
                        <Col sm={6}>
                            <img src={NoImg} alt="" width="100%" />
                        </Col>
                        <Col sm={6}>
                            <h5><b>Title:</b> {details.title}</h5>
                            <p><b>Price:</b> BDT{details.price}</p>
                            <p><b>Discount:</b> {details.discount}%</p>
                            <p><b>Colors:</b> {colorData.length !== 0 && colorData.map((item, i) => details.colors.includes(item._id) && <span key={item._id}>{++i}. {item.name}{' '}</span>)}</p>
                            <p><b>Sizes:</b> {sizeData.length !== 0 && sizeData.map((item, i) => details.sizes.includes(item._id) && <span key={item._id}>{++i}. {item.name} {' '}</span>)}</p>
                            <hr />
                            <p><b>Description:</b> {details.description}</p>
                            <hr />
                            <Form>
                                <h6 className='mb-2'><b>QNT:</b></h6>
                                <InputGroup>
                                    <Input
                                        type='number'
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <Button className='btn-warning' onClick={() => addToCartHandler(details)}>Add To Cart</Button>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                </div>}
            <div>
                {isAuth &&
                    <Review pdtId={details._id} />}
            </div>
        </div>
    )
}

export default ProductDetails;