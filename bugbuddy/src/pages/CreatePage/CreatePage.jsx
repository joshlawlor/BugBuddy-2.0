import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreatePage.css'
import tokenService from '../../utils/tokenService'

//BOOTSTRAP
import { Container, Form, Button } from 'react-bootstrap'


const CreatePage = ({ backendURL, loggedIn }) => {
    let navigate = useNavigate();
    const [auth, setAuth] = useState();
    const userToken = tokenService.getToken()

    const initialState = {
        title: "",
        content: "",
        category: ""
    }

    const [formData, setFormData] = useState(initialState)

    function handleChange(event) {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`${backendURL}/posts/`, {
            method: "POST", body: JSON.stringify(formData),
            headers: new Headers({ 'content-type': 'application/json', 'Authorization': `${userToken}` })
        })
            .then(response => {
                setFormData(initialState)
                return response.json()
            })
            .then(response => {
                navigate('/posts', { replace: true })
                window.location.reload(false);
            })
    }

    console.log('CREATE', loggedIn)

    useEffect(() => {
        setAuth(loggedIn)
        console.log(auth)
    })

    if (loggedIn) {
        return (
            <div className='createMain'>
                {/* <h1>Create Main</h1> */}
                <Container className='createTitle'>
                    {/* <h1>Need help?</h1> */}
                </Container>

                <Container className="createForm">
                    <br/>
                    <h1>Make a Post</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control onChange={handleChange} placeholder="API error..." />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control onChange={handleChange} as='textarea' rows={3} placeholder="I've got a bug..." />
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Select onChange={handleChange} aria-label="Category Select">
                                <option>Choose a language</option>
                                <option value='Javascript'>Javascript</option>
                                <option value='Python'>Python</option>
                                <option value='CSS'>CSS</option>
                            </Form.Select>
                        </Form.Group>


                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Container>
            </div>

        )
    } else {
        navigate('/')
    }



}


export default CreatePage;