import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfilePage.css'
import userServices from '../../utils/userServices'
import tokenService from '../../utils/tokenService'


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

    function refreshPost(){
        window.location.reload(false)
    }

    return (
        <div>
            <h1>Welcome {user.username}!</h1>

            <h2> Your Posts:</h2>
            <button onClick={refreshPost}>REFRESH POSTS</button>

            <ul>
                {userPosts.map(post => {
                    return (
                        <ul>
                            <li>{post.title}</li>
                        </ul>
                    )
                })}
            </ul>
        </div>
    )

}


export default ProfilePage