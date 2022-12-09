import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PostsPage.css'

//BOOTSTRAP
import { Card, Form, Button, Navbar, Nav, Container, ListGroup, ListGroupItem } from 'react-bootstrap'

const PostsPage = ({ backendURL , loggedIn}) => {

    const initialState = {
        link: ""
    }

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

  


    if(loggedIn){
        return (
            <div className='postsMain'>
                {/* <h1>Posts Page here!</h1> */}
    
                <div className='makePost'>
                    <Navbar className='searchBox' style={{ width: '90vw'}} bg='dark' variant='dark'>
    
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id='responsive-navbar-nav'>
                                <Nav className='me-auto'>
                                    
                                    <Nav.Link href="/posts/create">Make a Post</Nav.Link>
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
                                <Card className='postBox' style={{}}>
                                    <Card.Header>{post.title}</Card.Header>
                                    <Card.Body>
                                    <Card.Subtitle className='mb-1 text-muted'>By: {post.author}</Card.Subtitle>
                                    <Card.Subtitle className='mb-1 text-muted'>Language: {post.category}</Card.Subtitle>
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
    }else{
        return (
            <div className='postsMain'>
                {/* <h1>Posts Page here!</h1> */}
    
                <div className='makePost'>
                    <Navbar className='searchBox' style={{ width: '90vw'}} bg='dark' variant='dark'>
    
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id='responsive-navbar-nav'>
                                <Nav className='me-auto'>
                                    
                                    <Nav.Link href="/">Make a Post</Nav.Link>
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
                                <Card className='postBox' style={{}}>
                                    <Card.Header>{post.title}</Card.Header>
                                    <Card.Body>
                                    <Card.Subtitle className='mb-1 text-muted'>By: {post.author}</Card.Subtitle>
                                    <Card.Subtitle className='mb-1 text-muted'>Language: {post.category}</Card.Subtitle>
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
   
}


export default PostsPage