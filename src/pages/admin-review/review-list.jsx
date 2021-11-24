import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Col, Row, Table } from "reactstrap"


function ReviewList() {

    const reviewData = useStoreState(state => state.review.data)
    const activeInactive = useStoreActions(action => action.review.activeInactive)


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
                    {reviewData.length !== 0 && reviewData.map((item, i) =>
                        <tr key={item._id}>
                            <td>{++i}</td>
                            <td>{item.user.firstName} {item.user.lastName}</td>
                            <td>{item.product.title}</td>
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
                                <Button onClick={() => activeInactive({
                                    id: item._id,
                                    status: item.status === 1 ? 0 : 1
                                })}>{Number(item.status === 0) ? 'Active' : 'Inactive'}</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default ReviewList
