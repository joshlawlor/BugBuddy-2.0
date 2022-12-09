import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tokenService from "../../utils/tokenService";
import './PostDetailsPage.css'

//BOOTSTRAP
import { Container, Card, ListGroup } from "react-bootstrap";
import CommentForm from "../../components/CommentForm/CommentForm";

const PostDetailsPage = ({ backendURL, loggedIn }) => {
    const url = backendURL
    const navigate = useNavigate()
    const { postId } = useParams()
    const user = tokenService.getUserFromToken()
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
                // console.log(response)
                setPost([...response])
            })
    }

    useEffect(() => {

        getPost()

    }, [])

    const p = post[0]


    console.log('COMMENTS', p.comments)
    if (loggedIn) {
        return (
            <div className="detailMain">
                <Container className='post'>
                    <Card border="success" style={{ width: '80rem', margin: '3px' }}>
                        <Card.Header as="h3">{p.title}
                            <Card.Subtitle className="mb-2 text-muted">Posted by:{p.author} </Card.Subtitle>
                        </Card.Header>

                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Category:{p.category}</Card.Subtitle>
                            <Card>
                                <Card.Header as='h5'>Summary</Card.Header>
                                <Card.Text>{p.summary}</Card.Text>
                            </Card>
                            <br />
                            <Card>
                            <Card.Header as='h5'>Code:</Card.Header>
                                <Card.Text>{p.content}</Card.Text>
                            </Card>
                        </Card.Body>
                        <Card.Footer size='sm' className='text-muted'>Created: {p.createdAt}</Card.Footer>

                    </Card>

                </Container>

                <Container className='commentForm'>
                    <CommentForm user={user} backendURL={url} post={p} />

                </Container>


                <Container className='comments'>
                    <Card bg='success'>
                        <Card.Header>Comments:</Card.Header>
                        {p.comments.map(comment => {
                            return (
                                    <Card bg="secondary" className="comment">
                                        <Card.Header>By: {comment.author}</Card.Header>
                                        <Card.Body>{comment.content}</Card.Body>
                                 </Card>
                            )
                                   
                        })}


                    </Card>

                </Container>
            </div>
        )
    } else {
        return (
            <div className="detailMain">
                <Container className='post'>
                    <Card style={{ width: '80rem', margin: '3px' }}>
                        <Card.Header as="h3">{p.title}
                            <Card.Subtitle className="mb-2 text-muted">Posted by:{p.author} </Card.Subtitle>
                        </Card.Header>

                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Category:{p.category}</Card.Subtitle>
                            <br />
                            <Card>
                                <Card.Text >{p.summary}</Card.Text>
                            </Card>
                            <Card>
                                <Card.Text  rows={3}>{p.content}</Card.Text>
                            </Card>
                        </Card.Body>
                        <Card.Footer size='sm' className='text-muted'>Created: {p.createdAt}</Card.Footer>

                    </Card>
                </Container>
                <Container className='comments'>
                    <Card bg='success'>
                        <Card.Header>Comments:</Card.Header>
                        {p.comments.map(comment => {
                            return (
                                    <Card bg="secondary" className="comment">
                                        <Card.Header>By: {comment.author}</Card.Header>
                                        <Card.Body>{comment.content}</Card.Body>
                                 </Card>
                            )
                                   
                        })}


                    </Card>

                </Container>
            </div>
        )

    }




}

export default PostDetailsPage