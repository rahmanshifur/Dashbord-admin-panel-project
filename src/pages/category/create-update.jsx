import { useStoreActions } from "easy-peasy"
import { useEffect } from "react"
import { useState } from "react"
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"



function CreateUpdate({ editData, toggle }) {

    const [error, setError] = useState({})
    const [id, setId] = useState('')
    const [name, setName] = useState('')


    const createCategory = useStoreActions(action => action.category.create)
    const updateCategory = useStoreActions(action => action.category.update)

    useEffect(() => {
        setId(editData._id)
        setName(editData.name)
    }, [editData])

    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }
        let obj = { name }
        if (id) {
            updateCategory({ data: obj, id, successHandler })
            return
        }
        createCategory({ data: obj, successHandler })
    }

    function validation() {
        const error = {}
        if (!name) {
            error.name = 'The name field is required!'
        }
        setError(error)
        return Object.keys(error).length === 0
    }

    function successHandler() {
        setId('')
        setName('')
        toggle()
    }

    return (
        <div>
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>{id ? 'Update' : 'Create'} Category</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler} className="p-3 bg-warning">
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