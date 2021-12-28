
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';


function CreateUpdate({ editData, toggle }) {

    const [error, setError] = useState({})
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])

    const createProduct = useStoreActions(action => action.product.create)
    const updateProduct = useStoreActions(action => action.product.update)

    const getSubcategory = useStoreActions(action => action.subcategory.getSubcategory)
    const getSizes = useStoreActions(action => action.size.getSize)
    const getColors = useStoreActions(action => action.color.getColor)

    const subcategoryData = useStoreState(state => state.subcategory.data)
    const sizeData = useStoreState(state => state.size.data)
    const colorData = useStoreState(state => state.color.data)

    useEffect(() => {
        if (subcategoryData.length === 0) {
            getSubcategory()
        }
        if (sizeData.length === 0) {
            getSizes()
        }
        if (colorData.length === 0) {
            getColors()
        }

        if (editData._id) {
            setId(editData._id)
            setTitle(editData.title)
            setDescription(editData.description)
            setPrice(editData.price)
            setDiscount(editData.discount)
            setSubcategory(editData.subcategory?._id)
            setSizes(editData.sizes)
            setColors(editData.colors)
        }
    }, [editData])

    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }
        let obj = {
            title,
            description,
            price,
            discount,
            subcategory,
            sizes,
            colors
        }
        if (id) {
            updateProduct({ data: obj, id, successHandler })
            return;
        }
        createProduct({ data: obj, successHandler })
    }

    function validation() {
        const error = {}

        if (!title) {
            error.title = 'The title field is required!'
        }
        if (!description) {
            error.description = 'The description field is required!'
        }
        if (!price) {
            error.price = 'The price field is required!'
        }
        if (!discount) {
            error.discount = 'The discount field is required!'
        }
        if (!subcategory) {
            error.subcategory = 'The subcategory field is required!'
        }
        if (!sizes) {
            error.sizes = 'The sizes field is required!'
        }
        if (!colors) {
            error.colors = 'The colors field is required!'
        }
        setError(error)
        return Object.keys(error).length === 0
    }

    function successHandler() {
        setId('')
        setTitle('')
        setDescription('')
        setPrice('')
        setDiscount('')
        setSubcategory('')
        setSizes([])
        setColors([])
        toggle('')
    }

    function sizeChangeHandler(sizeId) {
        if (sizes.includes(sizeId)) {
            setSizes(sizes.filter(item => item !== sizeId))
        } else {
            setSizes([...sizes, sizeId])
        }
    }

    function colorChangeHandler(colorId) {
        if (colors.includes(colorId)) {
            setColors(colors.filter(item => item !== colorId))
        } else (
            setColors([...colors, colorId])
        )
    }


    return (
        <div>
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>{id ? 'Update' : 'Create'} Product</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler} className="p-3 bg-warning">
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label><b>Title:</b></Label>
                                    <Input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        invalid={error.title !== undefined}
                                        placeholder='Enter title'
                                    />
                                    <FormFeedback>{error.title}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label><b>Description:</b></Label>
                                    <Input
                                        type="textbox"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        invalid={error.description !== undefined}
                                        placeholder='Wright a short description'
                                    />
                                    <FormFeedback>{error.description}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label><b>Price:</b></Label>
                                    <Input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        invalid={error.price !== undefined}
                                        placeholder='Enter price'
                                    />
                                    <FormFeedback>{error.price}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label><b>Discount:</b></Label>
                                    <Input
                                        type="number"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        invalid={error.discount !== undefined}
                                        placeholder='Enter discount'
                                    />
                                    <FormFeedback>{error.discount}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label><b>Subcategory:</b></Label>
                                    <Input
                                        type="select"
                                        value={subcategory}
                                        onChange={(e) => setSubcategory(e.target.value)}
                                        invalid={error.subcategory !== undefined}
                                    >
                                        <option value=''>Select Subcategory</option>
                                        {subcategoryData.length !== 0 && subcategoryData.map(item =>
                                            <option key={item._id} value={item._id}>{item.name}</option>)}
                                    </Input>
                                    <FormFeedback>{error.subcategory}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label><b>Size:</b></Label><br />
                                    {sizeData.length !== 0 && sizeData.map(item =>
                                        <Label key={item._id} htmlFor={item._id}>
                                            <Input
                                                type="checkbox"
                                                id={item._id}
                                                onChange={() => sizeChangeHandler(item._id)}
                                                invalid={error.sizes !== undefined}
                                                checked={sizes.includes(item._id)}
                                            />{' '}{item.name}{' '}
                                        </Label>)}
                                    <FormFeedback>{error.sizes}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label><b>Color:</b></Label><br />
                                    {colorData.length !== 0 && colorData.map(item =>
                                        <Label key={item._id} htmlFor={item._id}>
                                            <Input
                                                type="checkbox"
                                                id={item._id}
                                                value={colors}
                                                onChange={() => colorChangeHandler(item._id)}
                                                invalid={error.colors !== undefined}
                                                checked={colors.includes(item._id)}
                                            />{' '}{item.name}{' '}
                                        </Label>)}
                                    <FormFeedback>{error.colors}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <Button color='primary' className=" mt-4 w-100">Save</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CreateUpdate