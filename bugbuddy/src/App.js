import './App.css';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import bug from './media/bug.png'


//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

//PAGES
import PostsPage from './pages/PostsPage/PostsPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginForm from './components/LoginForm/LoginForm'
import SignUpForm from './components/SignUpForm/SignUpForm'

const backendURL = 'http://localhost:4000'


function App() {
  return (
    <div className="App">
      
      <Navbar sticky='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>

        <Container>
          
          <Navbar.Brand href='/'><img src={bug}/> BugBuddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
            <Nav.Link href='/posts'>Posts</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    





      <Routes>
        <Route path='/' element={<WelcomePage/>}/>
        <Route path='/posts' element={<PostsPage backendURL={backendURL}/>}/>
        <Route path='/login' element={<LoginForm backendURL={backendURL}/>}/>
        <Route path='/signup' element={<SignUpForm backendURL={backendURL}/>}/>
      </Routes>
    </div>
  );
}

export default App;
