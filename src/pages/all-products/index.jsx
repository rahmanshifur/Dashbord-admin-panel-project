
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import NoImg from '../../assets/img/no-img.png'
import { Link } from '@reach/router';
import { useEffect } from 'react';

function AllProducts() {
    const getProduct = useStoreActions(action => action.product.getProduct)
    const productData = useStoreState(state => state.product.data)

    useEffect(() => {
        if (productData && productData.length !== 0) {
            getProduct()
        }
    }, [getProduct])

    return (
        <div>
            {productData &&
                productData.length !== 0 && productData.map(pdt =>
                    <Card className=' ms-2 float-start' style={{ width: '250px', height: 'auto' }}>
                        <CardImg src={NoImg} alt='' />
                        <CardBody>
                            <CardTitle tag='h5'>{pdt.title}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Price: {pdt.price} BDT</CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Vat: {pdt.vat} %</CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Discount: {pdt.discount} %</CardSubtitle>
                            <hr />
                            <CardText>{pdt.description}</CardText>
                            <Link className='btn btn-primary mt-2' to={`/product-details/${pdt._id}/${pdt.title}`}>Details</Link>
                        </CardBody>
                    </Card>)}
        </div>
    )
}

export default AllProducts