import React , {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import userServices from "../../utils/userServices";
import './PostDetailsPage.css'

//BOOTSTRAP
import { Container, Card, ListGroup } from "react-bootstrap";

const PostDetailsPage = ({backendURL, loggedIn}) => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const user =  userServices.getUser()
    const initialState = {
        title: "",
        content: "",
        category: "",
        comments: []
    }
    const [post, setPost] =  useState([initialState])
    async function getPost(){
        await fetch(`${backendURL}/posts/${postId}`, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' })
        })
            .then(response => {
                if (response.ok)
                    return response.json();
            })
            .then(response => {
                setPost([...response])
            })            
    }

    useEffect(() => {
      
        getPost()

    }, [])

    const p = post[0]
    if(loggedIn){
        return(
            <div className="detailMain">
                <Container className='post'>
                    <Card style={{width: '20rem', margin: '3px'}}>
                       <Card.Body>
                        <Card.Title>{p.title}</Card.Title>
                        </Card.Body> 
                    </Card>


                </Container>
            </div>
        )
    }




}

export default PostDetailsPage