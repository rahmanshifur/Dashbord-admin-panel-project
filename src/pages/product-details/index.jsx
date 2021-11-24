

import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import NoImg from '../../assets/img/no-img.png'
import Review from '../review';

function ProductDetails(props) {

    const getDetails = useStoreActions(action => action.product.getDetails)
    const getColor = useStoreActions(action => action.color.getColor)
    const getSize = useStoreActions(action => action.size.getSize)
    const details = useStoreState(state => state.product.details)
    const colorData = useStoreState(state => state.color.data)
    const sizeData = useStoreState(state => state.size.data)
    const isAuth = useStoreState(state => state.auth.isAuth)


    useEffect(() => {
        if (sizeData.length === 0) {
            getSize()
        }
        if (colorData.length === 0) {
            getColor()
        }
        getDetails(props.id)
    }, [props, getDetails, getColor])

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