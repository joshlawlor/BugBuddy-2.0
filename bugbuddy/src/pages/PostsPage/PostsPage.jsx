import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PostsPage.css'

//BOOTSTRAP
import { Card, Form, Button, Navbar, Nav, Container, ListGroup, ListGroupItem } from 'react-bootstrap'

const PostsPage = ({ backendURL }) => {

    let navigate = useNavigate()

    const [posts, setPosts] = useState([]);

    async function getAllPosts() {
        await fetch(`${backendURL}/posts/`, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' })
        })
            .then(response => {
                if (response.ok)
                    return response.json();
            })
            .then(response => {
                setPosts([...response])
            })
    }

    useEffect(() => {
        getAllPosts()
    }, [])


    return (
        <div className='postsMain'>
            {/* <h1>Posts Page here!</h1> */}

            <div className='makePost'>
                <Navbar className='searchBox' style={{ width: '90vw'}} bg='dark' variant='dark'>

                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='me-auto'>
                                <Nav.Link href='/posts/create'>Make a Post</Nav.Link>
                            </Nav>
                            <Form className='de-flex'>
                                <Form.Control
                                    type='search'
                                    placeholder='Search'
                                    className='me-2'
                                    aria-label="Search"
                                />
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div className='postsList'>

                <Container className="posts">
                    {posts.map(post => {
                        return (
                            <Card style={{}}>
                                <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Button a href={`/posts/${post._id}`}>View Post</Button>
                                </Card.Body>
                            </Card>
                            // <ListGroup.Item>
                            //    {post.title} 
                            //    <Button size="sm">View Post</Button>
                            // </ListGroup.Item>
                            


                        )
                        

                    })}

                </Container>
                
            </div>


        </div>
    )
}


export default PostsPage