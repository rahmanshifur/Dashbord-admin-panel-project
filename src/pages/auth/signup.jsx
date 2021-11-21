import { useStoreActions } from 'easy-peasy'
import { useState } from 'react'
import { Col, Form, FormGroup, Input, Label, Row, FormFeedback, Button } from "reactstrap";
import { Link } from '@reach/router';

function SignUp() {

    const [error, setError] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword,] = useState('')
    const [contact, setContact,] = useState('')

    const signUp = useStoreActions(action => action.auth.signUp)

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
            contact
        }

        signUp({ data: obj, successHandler })
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
        if (!password) {
            error.password = 'The password field is required!'
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
        setEmail('')
        setPassword('')
        setContact('')
    }

    return (
        <div className='py-5'>
            <Row >
                <Col sm={4}></Col>
                <Col sm={4}>
                    <Form onSubmit={submitHandler} className="p-3 bg-warning mt-5" >
                        <h4 className="text-center"><b>Sign Up</b></h4>
                        <hr />
                        <Row>
                            <Col sm={6}>

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
                            </Col>
                            <Col sm={6}>
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

                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>

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
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
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
                                </FormGroup>
                            </Col>
                        </Row>

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
                            <Button color='primary' className=" mt-4 w-100" type='submit'>SIGN UP</Button>
                            <hr />
                            <p className='text-center'>Already have an account? <span><Link to='/login'>Log In</Link></span></p>
                        </FormGroup>
                    </Form>
                </Col>
                <Col sm={4}></Col>
            </Row>
        </div>
    )
}

export default SignUp