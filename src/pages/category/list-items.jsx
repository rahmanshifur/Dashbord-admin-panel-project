import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Table } from "reactstrap"
import { Link } from '@reach/router';
import { replace } from "../../utils/helper";


function ListItems({ addHandler, isOpen }) {

    const categoryData = useStoreState(state => state.category.data)
    const removeCategory = useStoreActions(action => action.category.remove)

    return (
        <div className='category-list text-center'>
            <div className="add-category d-flex justify-content-between align-items-center">
                <h3>List of category :</h3>
                <p className='btn btn-light' onClick={() => addHandler()}>{isOpen ? (<i className="fa fa-times"></i>) : (<i className="fa fa-plus"  ></i>)}</p>
            </div>
            <hr />
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData && categoryData.length !== 0 && categoryData.map((item, i) =>
                            <tr key={item._id}>
                                <td>{++i}</td>
                                <td>
                                    {<Link to={`/category/${item._id}/${replace(item.name)}`}>{item.name}</Link>}
                                </td>
                                <td>
                                    <Button onClick={() => addHandler(item)}>Edit</Button>
                                    <Button className="ms-3 btn-danger" onClick={() => removeCategory(item._id)}>Delete</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ListItems