import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tokenService from '../../utils/tokenService'

//BOOTSTRAP
import { Container, Card } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const SignUpForm = ({ backendURL }) => {

    const [userCred, SetUserCred] = useState({ username: "", email: "", password: "", confirmPassword: "" })
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate()

    function handleChange(event) {
        SetUserCred({ ...userCred, [event.target.id]: event.target.value })
    }

    async function testUserCred() {
        await fetch(backendURL + '/users/signup',
            {
                method: 'POST',
                body: JSON.stringify(userCred),
                headers: new Headers({'content-type': 'application/json'})
            })
            .then((response) => {
                if(!response.ok){
                    console.log(response.body);
                }else{
                    setErrorCode(0);
                    console.log(response)
                    return response.json()
                }
            }).then(({token}) => {
                tokenService.setToken(token);
            }).catch(err => {
                console.log(err)
            })
    }

    function handleSubmit(e){
        console.log('Submitted')
        e.preventDefault();
        if(userCred.password === userCred.confirmPassword){
            testUserCred();
            navigate('/posts', {replace: true})
            window.location.reload(false)
        }else{
            console.log('ERROR', userCred)
            setErrorCode(1);
        }    
    }

    return (
        <div>
            <br />
            <h1>Become a Bugbuddy!</h1>
            <br />
            <div className='formBox'>
                <Container>

                    <Card>
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group controlId='username'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange = {handleChange} type='username' placeholder='Enter Username' />
                                <Form.Text size='sm' className='text-muted'>
                                    Pick something unique!
                                </Form.Text>
                            </Form.Group>

                            <Form.Group classname='mb-3' controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control onChange = {handleChange} type='email' placeholder='Enter Email' />
                                <Form.Text size='sm' className='text-muted'>
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange = {handleChange} type='password' placeholder='Enter Password' />

                            </Form.Group>
                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control onChange = {handleChange} type='password' placeholder='Confirm Password' />

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