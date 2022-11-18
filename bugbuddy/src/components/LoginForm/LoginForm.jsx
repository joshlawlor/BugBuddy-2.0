import React from 'react'

//BOOTSTRAP
import Form from 'react-bootstrap/Form'
import { Button, Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap'

const LoginForm = () => {


    return (
        <div className='loginMain'>
            <br/>
            <h2>Welcome back BugBuddy!</h2>
            <br/>

            <div className='formBox'>
                <Container>

                    <Card>
                        <Form>
                            <Form.Group classname='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type='email' placeholder='Enter Email' />
                                <Form.Text size='sm' className='text-muted'>
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Enter Password'/>

                            </Form.Group>
                            <Button variant='success' type='submit'>
                                Login
                            </Button>

                        </Form>
                    </Card>

                </Container>


            </div>


        </div>
    )
}


export default LoginForm