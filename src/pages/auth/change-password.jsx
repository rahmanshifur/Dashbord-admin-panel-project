import { useStoreActions } from "easy-peasy"
import { useState } from "react"
import { Form, Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap"


function ChangePassword({ toggle }) {

    const [error, setError] = useState({})
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const changePassword = useStoreActions(action => action.auth.changePassword)

    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }



        if (password !== confirmPassword) {
            alert(`Confirm password doesn't match`)
            return
        }

        let obj = {
            oldPassword,
            password,
            confirmPassword
        }

        changePassword({ data: obj, successHandler })

    }

    function validation() {
        const error = {}
        if (!oldPassword) {
            error.oldPassword = 'The old password field is required!'
        }
        if (!password) {
            error.password = 'The password field is required!'
        }
        if (!confirmPassword) {
            error.confirmPassword = 'The confirm password field is required!'
        }

        setError(error)
        return Object.keys(error).length === 0
    }

    function successHandler() {
        setOldPassword('')
        setPassword('')
        setConfirmPassword('')
        toggle()
    }


    return (
        <div>
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Change Password</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler} className="p-3 bg-warning">
                        <FormGroup>
                            <Label><b>Old  Password</b></Label>
                            <Input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter old password"
                                invalid={error.oldPassword !== undefined}
                            />
                            <FormFeedback>{error.oldPassword}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label><b>Password</b></Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                invalid={error.password !== undefined}
                            />
                            <FormFeedback>{error.password}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label><b>Confirm Password</b></Label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Enter confirm password"
                                invalid={error.confirmPassword !== undefined}
                            />
                            <FormFeedback>{error.confirmPassword}</FormFeedback>
                        </FormGroup>
                        <Button className="btn-success mt-3" type='submit'>Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default ChangePassword