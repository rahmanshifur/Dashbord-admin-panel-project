import { useStoreActions, useStoreState } from "easy-peasy"
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap"
import NoImg from '../../assets/img/no-img.png'
import { Link } from '@reach/router';
import { useEffect } from "react";


function ScatProducts(props) {

    console.log('props', props)

    const getCatId = useStoreActions(action => action.product.getCatId)
    const getScatId = useStoreActions(action => action.product.getScatId)
    const productData = useStoreState(state => state.product.data)
    const subcategoryData = useStoreState(state => state.subcategory.data)

    console.log('productData', productData)
    useEffect(() => {
        if (props.scatId) {
            getScatId(props.scatId)
        } else {
            getCatId(props.catId)
        }
    }, [props, getScatId, getCatId])

    return (
        <div className=''>
            <div className='text-center'>
                {subcategoryData.length !== 0 && subcategoryData.map(scat => scat._id === props.scatId &&
                    <span key={scat._id} >{scat.category?.name} {scat.name}</span>)}
            </div>
            <div className="pdt-group">
                <h3 className='text-center' >List of Product in this subcategory</h3>
                <hr />
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
        </div>
    )
}

export default ScatProducts