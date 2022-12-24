import './App.css';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import bug from './media/bug.png'
import tokenService from './utils/tokenService';
import userServices from './utils/userServices'
import { useNavigate } from 'react-router-dom'

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

//PAGES
import PostsPage from './pages/PostsPage/PostsPage';
import CreatePage from './pages/CreatePage/CreatePage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import LoginForm from './components/LoginForm/LoginForm'
import SignUpForm from './components/SignUpForm/SignUpForm'
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PostDetailsPage from './pages/PostDetailsPage/PostDetailsPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';



const backendURL = 'https://bugbuddy2.herokuapp.com'


function App() {
    const [user, setUser] = useState(userServices.getUser())
    const navigate = useNavigate()


    //CHECK IF LOGGED IN

    if(tokenService.loginCheck() == true){
      const loggedIn = "true"
      console.log(`${user.username} Logged In`, loggedIn)

      function handleLogout() {
        userServices.logout()
        navigate('/')
      }

      return (
        <div className="App">
          
          <Navbar sticky='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
    
            <Container>
              
              <Navbar.Brand href='/posts'><img href="/" src={bug}/> BugBuddy</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                <Nav.Link href='/posts'>Posts</Nav.Link>
                <Nav.Link href='/profile'>My Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Routes>
            <Route path='/' element={<WelcomePage/>}/>
            <Route path='/posts' element={<PostsPage loggedIn={loggedIn} backendURL={backendURL}/>}/>
            <Route path='/posts/:postId/edit' element={<EditPostPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
            <Route path='/posts/:postId' element={<PostDetailsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
            <Route path='/posts/create' element={<CreatePage backendURL={backendURL} loggedIn= {loggedIn}/>}/>
            <Route path='/login' element={<LoginForm backendURL={backendURL}/>}/>
            <Route path='/signup' element={<SignUpForm backendURL={backendURL}/>}/>
            <Route path='/profile' element={<ProfilePage backendURL={backendURL}/>}/>
          </Routes>
        </div>
      );
    }else {
      //NOT LOGGED IN
      const loggedIn = false
      console.log('User is not logged in')
      return (
        <div className="App">
          
          <Navbar sticky='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
    
            <Container>
              
              <Navbar.Brand href='/'><img src={bug}/> BugBuddy</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                <Nav.Link href='/posts'>Posts</Nav.Link>
                <Nav.Link href='/login'>Login</Nav.Link>
                <Nav.Link href='/signup'>Sign Up</Nav.Link>

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Routes>
            <Route path='/' element={<WelcomePage/>}/>
            <Route path='/posts' element={<PostsPage loggedIn={loggedIn} backendURL={backendURL}/>}/>
            <Route path='/posts/:postId' element={<PostDetailsPage backendURL={backendURL} loggedIn={loggedIn}/>}/>
            <Route path='/posts/create' element={<CreatePage backendURL={backendURL} loggedIn= {loggedIn}/>}/>
            <Route path='/login' element={<LoginForm backendURL={backendURL}/>}/>
            <Route path='/signup' element={<SignUpForm backendURL={backendURL}/>}/>
          </Routes>
        </div>
      )
    }


 
}

export default App;
