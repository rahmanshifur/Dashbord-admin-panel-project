import { useState } from "react"
import { useStoreActions } from 'easy-peasy';
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"
import { useEffect } from "react";

function CreateUpdate({ editData, toggle }) {

    const [error, setError] = useState({})
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const sizeCreate = useStoreActions(action => action.size.create)
    const sizeUpdate = useStoreActions(action => action.size.update)

    useEffect(() => {
        setId(editData._id)
        setName(editData.name)
    }, [editData])


    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }
        let obj = {
            name
        }
        if (id) {
            sizeUpdate({ data: obj, id, successHandler })
            return
        }
        sizeCreate({ data: obj, successHandler })



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
            <Modal isOpen={true} toggle={toggle} >
                <ModalHeader toggle={toggle} >{id ? 'Update' : 'Create'} Size</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler} className="p-3 bg-warning">
                        <FormGroup>
                            <Label><b>Name:</b></Label>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                invalid={error.name !== undefined}
                            />
                            <FormFeedback>{error.name}</FormFeedback>
                        </FormGroup>
                        <Button className='mt-3' type="submit" color="primary">Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CreateUpdate