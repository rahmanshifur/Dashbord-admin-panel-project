import { useStoreActions, useStoreState } from "easy-peasy"
import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap"


function CreateUpdate({ addHandler, editData }) {

    const [error, setError] = useState({})
    const [id, setId] = useState('')
    const [product, setProduct] = useState('')
    const [user, setUser] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState('')

    const createReview = useStoreActions(action => action.review.create)
    const updateReview = useStoreActions(action => action.review.update)
    const getProduct = useStoreActions(action => action.product.getProduct)
    const getUser = useStoreActions(action => action.user.getUser)

    const productData = useStoreState(state => state.product.data)
    const userData = useStoreState(state => state.user.data)

    useEffect(() => {
        if (productData.length === 0) {
            getProduct()
        }
        if (userData.length === 0) {
            getUser()
        }
        setId(editData._id)
        setComment(editData.comment)
        setRating(editData.rating)
    }, [editData, getUser, getProduct])


    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }

        let obj = {
            product,
            user,
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

        if (!product) {
            error.product = 'The product field is required!'
        }

        if (!user) {
            error.user = 'The user field is required!'
        }

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
        setProduct('')
        setUser('')
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
                        {!id &&
                            <FormGroup>
                                <Label><b>Product:</b></Label>
                                <Input
                                    type='select'
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                    invalid={error.product !== undefined}
                                >
                                    <option value=''>Select Product</option>
                                    {productData.length !== 0 && productData.map(pdt =>
                                        <option key={pdt._id} value={pdt._id}>{pdt.title}</option>)}
                                </Input>
                                <FormFeedback>{error.product}</FormFeedback>
                            </FormGroup>}
                        {!id &&
                            <FormGroup>
                                <Label><b>User:</b></Label>
                                <Input
                                    type='select'
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    invalid={error.user !== undefined}
                                >
                                    <option value=''>Select User</option>
                                    {userData.length !== 0 && userData.map(user =>
                                        <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>)}
                                </Input>
                                <FormFeedback>{error.user}</FormFeedback>
                            </FormGroup>}
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
                            <Input
                                type='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                invalid={error.rating !== undefined}
                            >
                                <option value=''>Select Rating</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='4'>4</option>
                            </Input>
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