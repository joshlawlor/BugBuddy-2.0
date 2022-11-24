import React from 'react'

//BOOTSTRAP
import {Container, Card} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const SignUpForm = ({backendURL}) => {


    return(
        <div>
            <br/>
            <h1>Become a Bugbuddy!</h1>
            <br/>
            <div className='formBox'>
                <Container>

                    <Card>
                        <Form>
                        <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='email' placeholder='Enter Username' />
                                <Form.Text size='sm' className='text-muted'>
                                    Pick something unique!
                                </Form.Text>
                            </Form.Group>

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
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='password' placeholder='Confirm Password'/>

                            </Form.Group>
                            <Button variant='success' type='submit'>
                                Sign Up
                            </Button>

                        </Form>
                    </Card>

                </Container>


            </div>


        </div>
    )
}


export default SignUpForm