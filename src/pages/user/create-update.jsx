import { useStoreActions } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap'

function CreateUpdate({ toggle, editData }) {

    const [error, setError] = useState({})
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword,] = useState('')
    const [contact, setContact,] = useState('')
    const [address, setAddress,] = useState('')

    const createUser = useStoreActions(action => action.user.create)
    const updateUser = useStoreActions(action => action.user.update)


    useEffect(() => {
        setId(editData._id)
        setFirstName(editData.firstName)
        setLastName(editData.lastName)
        setEmail(editData.email)
        setContact(editData.contact)
        setAddress(editData.address)
    }, [editData])


    function submitHandler(e) {
        e.preventDefault()
        if (!validation()) {
            return
        }
        let obj = {
            firstName,
            lastName,
            email,
            password,
            contact,
            address
        }
        if (id) {
            updateUser({ data: obj, id })
            return;
        }
        createUser({ data: obj, successHandler })
    }

    function validation() {
        const error = {}
        if (!firstName) {
            error.firstName = 'The first name field is required!'
        }
        if (!lastName) {
            error.lastName = 'The name last field is required!'
        }
        if (!email) {
            error.email = 'The email field is required!'
        }
        if (!id && !password) {
            error.password = 'The password field is required!'
        }
        if (!contact) {
            error.contact = 'The contact field is required!'
        }
        if (id && !address) {
            error.address = 'The address field is required!'
        }
        setError(error)
        return Object.keys(error).length === 0
    }


    function successHandler() {
        setId('')
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setContact('')
        setAddress('')
        toggle()
    }

    return (
        <div>
            <Modal isOpen={true} toggle={toggle} size='lg' static>
                <ModalHeader toggle={toggle}><b>{id ? 'Update' : 'Create'} User:</b></ModalHeader>
                <ModalBody>
                    <div className='content my-4 '>
                        <Form onSubmit={submitHandler} className='user-create p-4 bg-warning'>
                            <FormGroup>
                                <Label><b>FirstName:</b></Label>
                                <Input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder='Enter first name..'
                                    invalid={error.firstName !== undefined}
                                />
                                <FormFeedback>{error.firstName}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label><b>LastName:</b></Label>
                                <Input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder='Enter last name..'
                                    invalid={error.lastName !== undefined}
                                />
                                <FormFeedback>{error.lastName}</FormFeedback>
                            </FormGroup>
                            {!id &&
                                <FormGroup>
                                    <Label><b>Email:</b></Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter email'
                                        invalid={error.email !== undefined}
                                    />
                                    <FormFeedback>{error.email}</FormFeedback>
                                </FormGroup>}
                            {id ? <FormGroup>
                                <Label><b>Address:</b></Label>
                                <Input
                                    type="textarea"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder='Enter address'
                                    invalid={error.address !== undefined}
                                />
                                <FormFeedback>{error.address}</FormFeedback>
                            </FormGroup> :
                                <FormGroup>
                                    <Label><b>Password:</b></Label>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='password'
                                        invalid={error.password !== undefined}
                                    />
                                    <FormFeedback>{error.password}</FormFeedback>
                                </FormGroup>}
                            <FormGroup>
                                <Label><b>Contact:</b></Label>
                                <Input
                                    type="number"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder=' number'
                                    invalid={error.contact !== undefined}
                                />
                                <FormFeedback>{error.contact}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Button className="btn-success mt-4" type='submit'>Save</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default CreateUpdate
