import React from 'react'
import './PostsPage.css'

//BOOTSTRAP
import { Card, Form, Button, Navbar, Nav, Container } from 'react-bootstrap'

const PostsPage = () => {


    return (
        <div className='postsMain'>
            {/* <h1>Posts Page here!</h1> */}

            <div className='makePost'>
                <Navbar bg='dark' variant='dark'>

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
                <h1>PostsList here</h1>
            </div>


        </div>
    )
}


export default PostsPage