import { useStoreState } from "easy-peasy"
import { Button } from "reactstrap"


function ListItems({ addHandler, isOpen, pdtId, editData }) {

    const reviewData = useStoreState(state => state.review.data)

    console.log('reviewData', reviewData)


    return (
        <div className="content">
            <div className='d-flex justify-content-between align-items-center'>
                <h5><b>Average Rating:</b></h5>
                <Button onClick={() => addHandler()}>{isOpen ? 'Close' : 'Add Review'}</Button>
            </div>
            {reviewData.length !== 0 && reviewData.map(item => item.product?._id === pdtId &&
                <div key={item._id}>
                    <hr />
                    <p>{item.comment}</p>
                    <p className='d-flex'>
                        <b>Rating:</b>
                        <span className='d-flex '>
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
                        </span>
                    </p>
                    <p><b>Creator:</b> {item.user?.firstName} {item.user?.lastName}</p>

                </div>)}
        </div>
    )
}

export default ListItems


// rahmanshifur235@gmail.com
// rahmanshifur235@gmail.com