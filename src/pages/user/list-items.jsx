import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Table } from "reactstrap"
import { Link } from '@reach/router';
import { replace } from "../../utils/helper";


function ListItems({ addHandler, isOpen }) {
    const userData = useStoreState(state => state.user.data)
    console.log(userData)

    const removeUser = useStoreActions(action => action.user.remove)
    const editHandler = useStoreActions(action => action.user.edit)

    return (
        <div className="user-list text-center">
            <div className="add-user d-flex justify-content-between align-items-center">
                <h3>List of user :</h3>
                <p className='btn btn-light' onClick={() => addHandler()}>{isOpen ? (<i className="fa fa-times"></i>) : (<i className="fa fa-plus"  ></i>)}</p>
            </div>
            <hr />
            <div>
                <Table block>
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData && userData.length !== 0 && userData.map((item, i) =>
                            <tr key={item._id}>
                                <td>{++i}</td>
                                <td>
                                    {<Link to={`/user/${item._id}/${replace(item.firstName)}`}>{item.firstName} {item.lastName}</Link>}
                                </td>
                                <td>{item.email}</td>
                                <td>{Number(item.status) === 1 ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <Button color='success' onClick={() => editHandler(item._id)}>Edit</Button>
                                    <Button color='danger' onClick={() => removeUser(item._id)}>Delete</Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default ListItems