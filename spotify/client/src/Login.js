import React from 'react'
import { Container } from "react-bootstrap"
const AUTH_URL="https://accounts.spotify.com/authorize?client_id=d250697bb15c4b7eb3448f43218e067e&response_type=code&redirect_uri=https://react-better-spotify.herokuapp.com/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state" 

export default function Login() {
    return (
   
   <Container className="d-flex justify-content-center align-items-center"
    style={{ minHeight : "100vh" }}
   >
    <a className="btn btn-success btn-lg" href={AUTH_URL}>
       Login with spotify
   </a>
   </Container> 
    )
        
}


