import { useStoreActions, useStoreState } from "easy-peasy"
import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"


function ProfileUpdate({ toggle }) {


    const [error, setError] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')

    const profileUpdate = useStoreActions(action => action.auth.profileUpdate)
    const profileData = useStoreState(state => state.auth.profileInformation)





    useEffect(() => {
        setFirstName(profileData.firstName)
        setLastName(profileData.lastName)
        setAddress(profileData.address)
        setContact(profileData.contact)
    }, [profileData,])

    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }

        let obj = {
            firstName,
            lastName,
            address,
            contact
        }

        profileUpdate({ data: obj, successHandler })

    }

    function validation() {
        const error = {}
        if (!firstName) {
            error.firstName = 'The first name field is required!'
        }
        if (!lastName) {
            error.lastName = 'The last name field is required!'
        }
        if (!address) {
            error.address = 'The address field is required!'
        }
        if (!contact) {
            error.contact = 'The contact field is required!'
        }

        setError(error)
        return Object.keys(error).length === 0
    }

    function successHandler() {
        setFirstName('')
        setLastName('')
        setAddress('')
        setContact('')
        toggle()
    }

    return (
        <div>
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update Profile :</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler} className="p-3 bg-warning">
                        <FormGroup>
                            <Label><b>FirstName:</b></Label>
                            <Input
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder='Enter first name'
                                invalid={error.firstName !== undefined}
                            />
                            <FormFeedback>{error.firstName}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label><b>LastName:</b></Label>
                            <Input
                                type='text'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder='Enter last name'
                                invalid={error.lastName !== undefined}
                            />
                            <FormFeedback>{error.lastName}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label><b>Address:</b></Label>
                            <Input
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Enter address'
                                invalid={error.address !== undefined}
                            />
                            <FormFeedback>{error.address}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label><b>Contact:</b></Label>
                            <Input
                                type='text'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder='Enter contact'
                                invalid={error.contact !== undefined}
                            />
                            <FormFeedback>{error.contact}</FormFeedback>
                        </FormGroup>
                        <Button type="submit" color="primary">Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ProfileUpdate