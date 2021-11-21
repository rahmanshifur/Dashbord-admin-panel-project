import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Table } from "reactstrap"
import { Link } from '@reach/router';
import { replace } from './../../utils/helper';


function ListItems({ addHandler, isOpen }) {

    const colorData = useStoreState(state => state.color.data)
    const removeColor = useStoreActions(action => action.color.remove)

    return (
        <div className='color-list text-center'>
            <div className="add-color d-flex justify-content-between align-items-center">
                <h3>List of Color :</h3>
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
                        {colorData && colorData.length !== 0 && colorData.map((item, i) =>
                            <tr key={item._id}>
                                <td>{++i}</td>
                                <td>{<Link to={`/color/${item._id}/${replace(item.name)}`}> {item.name}</Link>}</td>
                                <td>
                                    <Button onClick={() => addHandler(item)}>Edit</Button>
                                    <Button className="ms-3 btn-danger" onClick={() => removeColor(item._id)}>Delete</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ListItems