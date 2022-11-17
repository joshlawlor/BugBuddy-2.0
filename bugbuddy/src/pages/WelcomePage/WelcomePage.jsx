import React from 'react'
import './WelcomePage.css'
import logo from '../../media/favicon.ico'

//BOOTSTRAP
import Container from 'react-bootstrap/Container'


const WelcomePage = () => {


    return(
        <div className='welcomeBox'>
            <div><h1>Welcome BugBuddy!</h1></div>
            <br/>
            <img src={logo} className="App-logo" alt="logo" />


        </div>
    )
}


export default WelcomePage