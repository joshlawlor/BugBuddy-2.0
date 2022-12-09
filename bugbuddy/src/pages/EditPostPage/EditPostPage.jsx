import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import userServices from "../../utils/userServices";
import tokenService from '../../utils/tokenService';
import './EditPostPage.css'
//BOOTSTRAP
import { Container, Card, ListGroup, Form, Button } from "react-bootstrap";


const EditPostPage = ({ backendURL }) => {
    const user = userServices.getUser()
    const navigate = useNavigate()
    const userToken = tokenService.getToken()
    const { postId } = useParams()
    const initialState = {
        title: "",
        content: "",
        category: "",
    }
    const [post, setPost] = useState([initialState])
    async function getPost() {
        await fetch(`${backendURL}/posts/${postId}`, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' })
        })
            .then(response => {
                if (response.ok)
                    return response.json();
            })
            .then(response => {
                setPost([...response])
            })
    }

    useEffect(() => {

        getPost()

    }, [])
    const p = post[0]
    //DELETE FUNCTIONALITY
    function handleDelete() {
        console.log('POST ID', postId)
        fetch(`${backendURL}/posts/${postId}`,
            {
                method: "DELETE", headers: new Headers({ 'content-type': 'application/json', 'Authorization': `${userToken}` })
            })
        navigate('/profile')
    }



    //EDIT FUNCTIONALITY

    const [formData, setFormData] = useState()

    console.log('FORM DATA', formData)


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        fetch(`${backendURL}/posts/${postId}/edit`, {
            method: "PUT", body: JSON.stringify(formData),
            headers: new Headers({ 'content-type': 'application/json', 'Authorization': `${userToken}` })
        })
            .then(response => {
                setFormData(initialState)
                return response.json()
            })
            .then(response => {
                window.location.reload(false);
            })
    }



    return (
        <div className="editMain">
            <Container className='post'>
                <Card bg='light' style={{ width: '80rem', margin: '3px' }}>
                    <Card.Header as="h3">{p.title}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">Posted by:{p.author} {p.createdAt}</Card.Subtitle>
                        <Card.Text className="mb-2 text-muted">Category:{p.category}</Card.Text>
                        <br />
                        <Card>
                            <Card.Header>Summary</Card.Header>
                            <Card.Text>{p.summary}</Card.Text>
                        </Card>
                        <br />
                        <Card>
                            <Card.Header>Code:</Card.Header>
                            <Card.Text>{p.content}</Card.Text>
                        </Card>
                    </Card.Body>
                    <Button onClick={handleDelete} variant="danger" size="md">DELETE</Button>
                </Card>
            </Container>
            <Container className="editForm">

                <Card bg='warning'>
                    <Card.Header as="h5" className='text-muted'>Edit Post</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label className='text-muted'>Post Title</Form.Label>
                                <Form.Control onChange={handleChange} defaultValue={p.title} placeholder="Title" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="summary">
                                <Form.Label className='text-muted'>Summary</Form.Label>
                                <Form.Control onChange={handleChange} as='textarea' rows={3} defaultValue={p.summary} placeholder={p.content} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label className='text-muted'>Content</Form.Label>
                                <Form.Control onChange={handleChange} as='textarea' rows={3} defaultValue={p.content} placeholder={p.content} />
                            </Form.Group>

                            <Form.Group controlId="category">
                            <Form.Label className='text-muted'>Category</Form.Label>
                                <Form.Select className='text-muted' onChange={handleChange} aria-label="Category Select">
                                    <option>{p.category}</option>
                                    <option value='Javascript'>Javascript</option>
                                    <option value='Python'>Python</option>
                                    <option value='CSS'>CSS</option>
                                </Form.Select>
                            </Form.Group>
                            <br />

                        </Form>


                    </Card.Body>
                    <Button onClick={handleSubmit} variant="success" type="submit">
                        Edit
                    </Button>
                </Card>

            </Container>
            {/* <Container className='comments'>
                <Card>
                    <Card.Header>Comments:</Card.Header>
                </Card>

            </Container> */}
            <br />
        </div>
    )

}


export default EditPostPage