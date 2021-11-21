
import { Form, FormGroup, Input, FormFeedback, Row, Label, Col, Button } from 'reactstrap';
import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Link } from '@reach/router';

function LogIn() {

    const [error, setError] = useState({})
    const [email, setEmail] = useState('admin@gmail.com ')
    const [password, setPassword] = useState('123')

    const login = useStoreActions(action => action.auth.login)

    function submitHandler(e) {
        e.preventDefault()

        if (!validation()) {
            return
        }

        let obj = {
            email,
            password
        }

        login({ data: obj, successHandler })

    }


    function validation() {
        const error = {}

        if (!email) {
            error.email = 'The email field is required!'
        }
        if (!password) {
            error.password = 'The name password is required!'
        }


        setError(error)

        return Object.keys(error).length === 0

    }

    function successHandler() {
        setEmail('')
        setPassword('')
    }

    return (
        <div className='py-5'>
            <Row>
                <Col sm={4}></Col>
                <Col sm={4} className="">
                    <Form onSubmit={submitHandler} className='p-2 bg-warning mt-5'>
                        <h3 className='text-center '>Log In</h3>
                        <hr />
                        <FormGroup>
                            <Label><b>Email:</b></Label>
                            <Input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter email'
                                invalid={error.email !== undefined}
                            />
                            <FormFeedback>{error.email}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label><b>Password:</b></Label>
                            <Input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter password'
                                invalid={error.password !== undefined}
                            />
                            <FormFeedback>{error.password}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Button className="my-3 w-100" color='primary' type="submit">LOG IN</Button>
                            <Link to='#' >Forgotten Password</Link>
                            <hr />
                            <p className='text-center'>Don't have an account? <span><Link to='/sign-up'>Sign Up</Link></span></p>
                        </FormGroup>
                    </Form>
                </Col>
                <Col sm={4}></Col>
            </Row>
        </div>
    )
}

export default LogIn