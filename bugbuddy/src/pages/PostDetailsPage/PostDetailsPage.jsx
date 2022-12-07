import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userServices from "../../utils/userServices";
import './PostDetailsPage.css'

//BOOTSTRAP
import { Container, Card, ListGroup } from "react-bootstrap";

const PostDetailsPage = ({ backendURL, loggedIn }) => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const user = userServices.getUser()
    const initialState = {
        title: "",
        content: "",
        category: "",
        comments: []
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
                console.log(response)
                setPost([...response])
            })
    }

    useEffect(() => {

        getPost()

    }, [])

    const p = post[0]
    if (loggedIn) {
        return (
            <div className="detailMain">
                <Container className='post'>
                    <Card style={{ width: '80rem', margin: '3px' }}>
                        <Card.Header as="h3">{p.title}</Card.Header>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Posted by:{p.author} {p.createdAt}</Card.Subtitle>
                            <Card.Text className="mb-2 text-muted">Category:{p.category}</Card.Text>
                            <br />
                            <Card>
                                <Card.Text>{p.content}</Card.Text>
                            </Card>
                        </Card.Body>
                    </Card>
                </Container>
                <Container className='comments'>
                    <Card>
                        <Card.Header>Comments:</Card.Header>
                    </Card>

                </Container>
            </div>
        )
    }




}

export default PostDetailsPage