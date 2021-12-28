import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Table } from "reactstrap"
import { Link } from '@reach/router';
import { replace } from "../../utils/helper";


function ListItems({ addHandler, isOpen }) {

    const productData = useStoreState(state => state.product.data)
    const colorData = useStoreState(state => state.color.data)
    const sizeData = useStoreState(state => state.size.data)
    const removeProduct = useStoreActions(action => action.product.remove)

    { console.log('productData', productData) }


    return (
        <div className='product-list text-center'>
            <div className="add-product d-flex justify-content-between align-items-center">
                <h3>List of product :</h3>
                <p className='btn btn-light' onClick={() => addHandler()}>{isOpen ? (<i className="fa fa-times"></i>) : (<i className="fa fa-plus"  ></i>)}</p>
            </div>
            <hr />
            <div>
                <Table block>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Subcategory</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData && productData.length !== 0 && productData.map((item, i) =>
                            <tr key={item._id}>
                                {console.log('item', item)}
                                <td>{++i}</td>
                                <td>
                                    {<Link to={`/product-details/${item._id}/${replace(item.title)}`}>{item.title}</Link>}
                                </td>
                                <td>{item.description}</td>
                                <td>BDT{item.price}</td>
                                <td>{item.discount}%</td>
                                <td>{item.subcategory?.name}</td>
                                <td>{sizeData.length !== 0 && sizeData.map(siz => item.sizes.includes(siz._id) && <span key={siz._id}>{siz.name}{' '}</span>)}</td>
                                <td>{colorData.length !== 0 && colorData.map(clr => item.colors.includes(clr._id) && <span key={clr._id}>{clr.name}{' '}</span>)}</td>
                                <td>
                                    <Button onClick={() => addHandler(item)}>Edit</Button>
                                    <Link className='btn btn-primary mx-3' to={`/product-details/${item._id}/${item.title}`}>Details</Link>
                                    <Button className=" btn-danger" onClick={() => removeProduct(item._id)}>Delete</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ListItems