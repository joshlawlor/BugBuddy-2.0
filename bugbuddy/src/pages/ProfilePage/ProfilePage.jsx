import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfilePage.css'
import userServices from '../../utils/userServices'
import tokenService from '../../utils/tokenService'

//BOOTSTRAP
import { Container, Card, ListGroup, Button } from "react-bootstrap";



const ProfilePage = ({ backendURL }) => {
    const [userPosts, setUserPosts] = useState([])

    const userToken = tokenService.getToken()

    const navigate = useNavigate()

    const user = tokenService.getUserFromToken()

    const [userCred, setUserCred] = useState({ email: `${user.email}` })

    async function getUsersPosts() {
        await fetch(`${backendURL}/users/posts`, {
            method: "GET",
            headers: new Headers({
                'content-type': 'application/json', 'Authorization': `${userToken}`
            })
        }).then(response => {
            console.log(response)
            if (response.ok)
                return response.json()
        })
            .then(response => {
                setUserPosts([...response])
            })
    }

    function getUserCred() {
        console.log('USER CRED RAN', userCred)

        return fetch(`${backendURL}/users/user`, {
            method: "POST",
            headers: new Headers({ 'Content-type': 'application/json' }),
            body: JSON.stringify(userCred)
        })
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error('Bad Credentials')
            })
            .then(({ token }) => {
                tokenService.setToken(token)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUsersPosts();
        getUserCred();
    },
        [])

    function refreshPost() {
        window.location.reload(true)
    }

    return (
        <div>
            <div className="profileMain">
                <Container className='post'>
                    <Card style={{ width: '50rem', margin: '3px' }}>
                        <Card.Header as="h3">Welcome {user.username}</Card.Header>
                            <Button onClick={refreshPost}>REFRESH POSTS</Button>
                    </Card>
                </Container>
                <Container className='comments'>
                    {userPosts.map(post => {
                        return (
                            <Card className='postCard'>
                                <Card.Subtitle className="mb-2 text-muted">Created:{post.createdAt} </Card.Subtitle>

                                <Card.Title>{post.title}</Card.Title>
                                <Button a href={`/posts/${post._id}/edit`}>View Post</Button>
                                {/* <footer className='mb-1text-muted'>{post.createdAt}</footer> */}
                            </Card>
                        )
                    })}

                </Container>
            </div>
        </div>


    )

}


export default ProfilePage