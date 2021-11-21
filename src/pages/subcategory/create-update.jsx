import { useStoreActions, useStoreState } from "easy-peasy"
import { useEffect } from "react"
import { useState } from "react"
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"



function CreateUpdate({ editData, toggle }) {

    const [error, setError] = useState({})
    const [id, setId] = useState('')
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')


    const getCategory = useStoreActions(action => action.category.getCategory)
    const createSubcategory = useStoreActions(action => action.subcategory.create)
    const updateSubcategory = useStoreActions(action => action.subcategory.update)
    const categoryData = useStoreState(state => state.category.data)

    useEffect(() => {
        if (categoryData.length === 0) {
            getCategory()
        }
        setId(editData._id)
        if (editData._id) {
            setCategory(editData.category._id)
            setName(editData.name)
        }
    }, [editData, getCategory])

    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }
        let obj = {
            name,
            category
        }
        if (id) {
            updateSubcategory({ data: obj, id, successHandler })
            return
        }
        createSubcategory({ data: obj, successHandler })
    }

    function validation() {
        const error = {}
        if (!category) {
            error.category = 'The name category is required!'
        }
        if (!name) {
            error.name = 'The name field is required!'
        }
        setError(error)
        return Object.keys(error).length === 0
    }

    function successHandler() {
        setId('')
        setCategory('')
        setName('')
        toggle()
    }

    return (
        <div>
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>{id ? 'Update' : 'Create'} Subcategory</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler} className="p-3 bg-warning">
                        <FormGroup>
                            <Label><b>Category:</b></Label>
                            <Input
                                type="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                invalid={error.category !== undefined}
                            >
                                <option value=''>Select Category</option>
                                {categoryData && categoryData.length !== 0 && categoryData.map(item =>
                                    <option key={item._id} value={item._id}>{item.name}</option>)}
                            </Input>
                            <FormFeedback>{error.category}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label><b>Name:</b></Label>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                invalid={error.name !== undefined}
                            />
                            <FormFeedback>{error.name}</FormFeedback>
                        </FormGroup>
                        <Button className='mt-3' type="submit" color='primary'>Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default CreateUpdate