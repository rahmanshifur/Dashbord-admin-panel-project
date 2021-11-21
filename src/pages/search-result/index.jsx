import { useEffect } from "react"
import { useStoreState, useStoreActions } from "easy-peasy"
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap"
import { Link } from '@reach/router';
import NoImg from '../../assets/img/no-img.png'




function SearchResult(props) {

    console.log('props', props)

    // ACTIONS
    const getPdtBySearch = useStoreActions(action => action.product.getSearch)

    // GLOBAL STATE
    const productData = useStoreState(state => state.product.data)


    useEffect(() => {
        getPdtBySearch(props.location.search)
    }, [props])


    return (
        <div>
            {productData.length !== 0 && productData.map(pdt =>
                <Card className=' ms-2 float-start' style={{ width: '250px', height: 'auto' }}>
                    <CardImg src={NoImg} alt='' style={{ width: '250px', height: '150px' }} />
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
export default SearchResult