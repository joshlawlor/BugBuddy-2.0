import React, { useState } from 'react'
import './CommentForm.css'
import { useNavigate } from 'react-router-dom';
import tokenService from '../../utils/tokenService';
import { Container, Card, Form , Button, Row, Col} from "react-bootstrap";


const CommentForm = ({ post, backendURL, user }) => {

    const navigate = useNavigate()

    const initialState = {
        content: "",
        author: `${user.username}`,
    }
    const userToken = tokenService.getToken()

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${backendURL}/posts/${post._id}/comments/`, {
            method: "POST", body: JSON.stringify(formData),
            headers: new Headers({ 'content-type': 'application/json', 'Authorization': `${userToken}` })
        })
            .then(response => {
                console.log(response)
                setFormData(initialState)
                return response.json()
            })
            .then(response => {
                // navigate('/posts', { replace: true })
                window.location.reload(false);
            })
    }
    
    return (
        <Container>

                <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3' controlId='content'>
                                <Form.Label>Comment as <a href='/profile'>{user.username}</a></Form.Label>
                            <Form.Control onChange={handleChange} as='textarea' rows={5} placeholder="Any insight?" />
                            </Form.Group>
                            <Form.Group  className='authorBox' as={Row} controlId='author'>
                                <Form.Control plaintext hidden value={user.username} onChange={handleChange} placeholder={`By ${user.username}`}></Form.Control>
                            </Form.Group>
                           <Button variant="success" type='submit'>Comment</Button>
                        </Form>
        </Container>

    )







}

export default CommentForm