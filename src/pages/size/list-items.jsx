import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Table } from "reactstrap"
import { Link } from '@reach/router';
import { replace } from './../../utils/helper';


function ListItems({ addHandler, isOpen }) {

    const sizeData = useStoreState(state => state.size.data)
    const editHandler = useStoreActions(action => action.size.edit)
    const removeHandler = useStoreActions(action => action.size.remove)


    return (
        <div className="size-list text-center">
            <div className="add-size d-flex justify-content-between align-items-center">
                <h3>List of size :</h3>
                <p className='btn btn-light' onClick={() => addHandler()}>{isOpen ? (<i className="fa fa-times"></i>) : (<i className="fa fa-plus"  ></i>)}</p>
            </div>
            <hr />
            <div>
                <Table block>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizeData && sizeData.length !== 0 && sizeData.map((item, i) =>
                            <tr key={item._id}>
                                <td>{++i}</td>
                                <td>
                                    {<Link to={`/size/${item._id}/${replace(item.name)}`}>{item.name}</Link>}
                                </td>
                                <td>
                                    <Button onClick={() => editHandler(item._id)}>Edit</Button>
                                    <Button className='ms-3 btn-danger' onClick={() => removeHandler(item._id)}>Delete</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ListItems