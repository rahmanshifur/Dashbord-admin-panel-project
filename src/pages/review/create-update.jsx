import { useStoreActions } from "easy-peasy"
import { useState, useEffect } from "react"
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap"


function CreateUpdate({ addHandler, editData, userId, pdtId }) {

    const [error, setError] = useState({})
    const [id, setId] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState('')

    const createReview = useStoreActions(action => action.review.create)
    const updateReview = useStoreActions(action => action.review.update)


    useEffect(() => {
        setId(editData._id)
        setComment(editData.comment)
        setRating(editData.rating)
    }, [editData])


    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }

        let obj = {
            product: pdtId,
            user: userId,
            comment,
            rating
        }

        if (id) {
            updateReview({ data: obj, id, successHandler })
            return
        }
        createReview({ data: obj, successHandler })
    }

    function validation() {
        const error = {}

        if (!comment) {
            error.comment = 'The comment field is required!'
        }

        if (!rating) {
            error.rating = 'The rating field is required!'
        }

        setError(error)

        return Object.keys(error).length === 0
    }

    function successHandler() {
        setId('')
        setComment('')
        setRating('')
        addHandler()
    }

    return (
        <div>
            <Row>
                <Col sm={5}>
                    <Form onSubmit={submitHandler} className=' p-4'>
                        <h4>{id ? 'Update' : 'Create'} Review:</h4>
                        <hr />
                        <FormGroup>
                            <Label><b>Comment:</b></Label>
                            <Input
                                type='textarea'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                invalid={error.comment !== undefined}
                                placeholder='Enter comment'
                            />
                            <FormFeedback>{error.comment}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label><b>Rating:</b></Label>
                            <ul className="rating ps-0 d-flex">
                                <li className={rating > 0 ? 'active' : ''} onClick={() => setRating(1)}>
                                    <i class="fa fa-star" ></i>
                                </li>
                                <li className={rating > 1 ? 'active' : ''} onClick={() => setRating(2)}>
                                    <i class="fa fa-star" ></i>
                                </li>
                                <li className={rating > 2 ? 'active' : ''} onClick={() => setRating(3)}>
                                    <i class="fa fa-star" ></i>
                                </li>
                                <li className={rating > 4 ? 'active' : ''} onClick={() => setRating(5)}>
                                    <i class="fa fa-star" ></i>
                                </li>
                                <li className={rating > 5 ? 'active' : ''} onClick={() => setRating(6)}>
                                    <i class="fa fa-star" ></i>
                                </li>
                            </ul>
                            <FormFeedback>{error.rating}</FormFeedback>
                        </FormGroup>
                        <Button type="submit" class="btn btn-success mt-3">Submit</Button>
                    </Form>
                </Col>
                <Col sm={7}></Col>
            </Row>

        </div>
    )
}

export default CreateUpdate