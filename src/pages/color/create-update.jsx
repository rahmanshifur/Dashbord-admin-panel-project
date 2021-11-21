import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

function CreateUpdate({ editData, addHandler }) {

    const [error, setError] = useState({})
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const colorCreate = useStoreActions(action => action.color.create)
    const colorUpdate = useStoreActions(action => action.color.update)

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
            colorUpdate({ data: obj, id, successHandler })
            return;
        }
        colorCreate({ data: obj, successHandler })
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
        setName('')
        addHandler()
    }

    return (
        <Modal isOpen={true} toggle={addHandler} size='lg' static>
            <ModalHeader toggle={addHandler}><b>{id ? 'Update' : 'Create'} User:</b></ModalHeader>
            <ModalBody>
                <Form onSubmit={submitHandler} className="p-3 bg-warning">
                    <FormGroup>
                        <Label><b>Name: </b></Label>
                        <Input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter name'
                            invalid={error.name !== undefined}
                        />
                        <FormFeedback>{error.name}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" color='success' className='mt-3'>Save</Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default CreateUpdate