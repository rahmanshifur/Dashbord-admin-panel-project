import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Table } from "reactstrap"
import { Link } from '@reach/router';
import { replace } from './../../utils/helper';


function ListItems({ addHandler, isOpen }) {

    const subcategoryData = useStoreState(state => state.subcategory.data)
    const removeSubcategory = useStoreActions(action => action.subcategory.remove)
    const categoryData = useStoreState(state => state.category.data)


    return (
        <div className='subcategory-list text-center'>
            <div className="add-subcategory d-flex justify-content-between align-items-center">
                <h3>List of subcategory :</h3>
                <p className='btn btn-light' onClick={() => addHandler()}>{isOpen ? (<i className="fa fa-times"></i>) : (<i className="fa fa-plus"  ></i>)}</p>
            </div>
            <hr />
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategoryData && subcategoryData.length !== 0 && subcategoryData.map((item, i) =>
                            <tr key={item._id}>
                                <td>{++i}</td>
                                <td>{item.category.name}</td>
                                <td>
                                    {<Link to={`/subcategory/${item._id}/${replace(item.name)}`}>{item.name}</Link>}
                                </td>
                                <td>
                                    <Button onClick={() => addHandler(item)}>Edit</Button>
                                    <Button className="ms-3 btn-danger" onClick={() => removeSubcategory(item._id)}>Delete</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ListItems