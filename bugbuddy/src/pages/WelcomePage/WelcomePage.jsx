import React from 'react'
import './WelcomePage.css'
import logo from '../../media/favicon.ico'
import { useNavigate } from 'react-router-dom'

//BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const WelcomePage = () => {

    let navigate = useNavigate();
    const loginRoute = () =>{
        let path = '/login'
        navigate(path);
    }
    const signUpRoute = () =>{
        let path='/signup'
        navigate(path);
    }

    return(
        <div className='welcomeBox'>
            <div className='title'><h1>Welcome BugBuddy!</h1></div>
            <br/>
            <div className='logoBox'><img src={logo} className="App-logo" alt="logo" /></div>
            <div className='buttonBox'>
            <Button onClick={loginRoute} variant='success' size='lg'>Log In</Button>
            <Button onClick={signUpRoute} variant='success' size='lg'>Sign Up</Button>
            </div>

        </div>
    )
}


export default WelcomePage