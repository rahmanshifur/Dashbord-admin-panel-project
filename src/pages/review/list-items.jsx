import { useStoreActions, useStoreState } from "easy-peasy"
import { Button, Col, Row } from "reactstrap"


function ListItems({ addHandler, isOpen, pdtId }) {
    console.log('ListItems', pdtId)

    const removeHandler = useStoreActions(action => action.review.remove)
    const reviewData = useStoreState(state => state.review.data)

    return (
        <div className="content">
            <div className='d-flex justify-content-between align-items-center'>
                <h5><b>Average Rating:</b></h5>
                <Button onClick={() => addHandler()}>{isOpen ? 'Close' : 'Add Review'}</Button>
            </div>
            {reviewData.length !== 0 && reviewData.map(item => item.product._id === pdtId &&
                <div key={item._id}>
                    <hr />
                    <p>{item.comment}</p>
                    <p><b>Rating:</b> {item.rating}</p>
                    <p><b>Creator:</b> {item.user.firstName} {item.user.lastName}</p>
                    <p className="btn ms-5 ps-5" onClick={() => addHandler(item)}>Edit</p>
                    <p className="btn " onClick={() => removeHandler(item._id)}>Delete</p>
                </div>)}
        </div>
    )
}

export default ListItems