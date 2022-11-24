import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tokenService from '../../utils/tokenService'

//BOOTSTRAP
import Form from 'react-bootstrap/Form'
import { Button, Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap'

const LoginForm = ({ backendURL }) => {

    const [userCred, SetUserCred] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    function handleChange(event) {
        SetUserCred({ ...userCred, [event.target.id]: event.target.value })
    }

    function getUserCred() {
        console.log(userCred)
        return fetch(`${backendURL}/users/login`, {
            method: 'POST',
            headers: new Headers({ 'Content-type': 'application/json' }),
            body: JSON.stringify(userCred)
        })
            .then((response) => {
                console.log(response)
                if (response.ok) return response.json()
                throw new Error('Bad Credentials')
            }).then(({ token }) => {
                console.log('TOKEN', token)
                tokenService.setToken(token);
            }).catch(err => {
                console.log(err)
            })
    }

    async function handleSubmit(e){
        e.preventDefault()
        await getUserCred();
        const validate = tokenService.loginCheck()
        if(userCred.email == '' || userCred.password == ''){
            alert('Username Or Password not Valid')
        }else if(validate == false){
            alert('Username Or Password not Valid')
        }else{
            getUserCred()
            navigate('/posts', {replace: true})
            window.location.reload(false)
        }
    }

    return (
        <div className='loginMain'>
            <br />
            <h2>Welcome back BugBuddy!</h2>
            <br />

            <div className='formBox'>
                <Container>

                    <Card>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3' controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control onChange={handleChange} type='email' placeholder='Enter Email' />
                                <Form.Text size='sm' className='text-muted'>
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handleChange} type='password' placeholder='Enter Password' />

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