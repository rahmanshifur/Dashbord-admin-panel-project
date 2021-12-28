import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Table } from "reactstrap"


function ReviewList({ props, editData, addHandler }) {
    console.log('editData', editData)
    const removeHandler = useStoreActions(action => action.review.remove)
    const activeInactive = useStoreActions(action => action.review.activeInactive)

    const reviewData = useStoreState(state => state.review.data)


    return (
        <div className="content">
            <Table>
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>User</th>
                        <th>Product</th>
                        <th>Comment</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewData && reviewData.length !== 0 && reviewData.map((item, i) =>
                        <tr key={item._id}>
                            {console.log('item', item)}
                            <td>{++i}</td>
                            <td>{item.user?.firstName} {item.user?.lastName}</td>
                            <td>{item.product?.title}</td>
                            <td>{item.comment}</td>
                            <td>
                                <div className='d-flex'>
                                    {item.rating > 0 &&
                                        <li className="active">
                                            <i class="fa fa-star" ></i>
                                        </li>}
                                    {item.rating > 1 &&
                                        <li className="active">
                                            <i class="fa fa-star" ></i>
                                        </li>}
                                    {item.rating > 2 &&
                                        <li className="active">
                                            <i class="fa fa-star" ></i>
                                        </li>}
                                    {item.rating > 3 &&
                                        <li className="active">
                                            <i class="fa fa-star" ></i>
                                        </li>}
                                    {item.rating > 4 &&
                                        <li className="active">
                                            <i class="fa fa-star" ></i>
                                        </li>}
                                </div>
                            </td>
                            <td>{Number(item.status !== 0) ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Button onClick={() => activeInactive({ id: item._id, status: item.status === 1 ? 0 : 1 })}>
                                    {Number(item.status === 0) ? 'Active' : 'Inactive'}</Button>
                                <Button className="btn-success" onClick={() => Object.keys(editData).length === 0 ? addHandler(item) : null}>Edit</Button>
                                <Button className="btn-danger" onClick={() => removeHandler(item._id)}>Delete</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default ReviewList
