
import {useState,useEffect } from 'react'
import axiosInstance from '../../config';
export default function useAuth(code) {
    const[accessToken,setAccessToken]= useState()
    const[refreshToken,setRefreshToken] = useState()
    const[expiresIn,setExpiresIn] = useState()
console.log(refreshToken)


    useEffect(() => {
    
        axiosInstance.post('https://react-better-spotify.herokuapp.com//login',
{
code,
}).then(res => {
    setAccessToken(res.data.accessToken)
    setRefreshToken(res.data.refreshToken)
    setExpiresIn(res.data.expiresIn)
    window.history.pushState( { }, null,"/")
}).catch(() => {
window.location ="/"
})
 }, [code])


 useEffect(()=>{
if (!refreshToken ||! expiresIn) return
const interval=setInterval(()=> { 
    axiosInstance.post('https://react-better-spotify.herokuapp.com//refresh',
    {
    refreshToken,
    })
    .then(res => {
       setAccessToken(res.data.accessToken)
       setExpiresIn(res.data.expiresIn)
    
    })
    .catch(() => {
    window.location = "/"
    }) 
 
    
 } ,(expiresIn - 60) * 1000)
    return () => clearInterval(interval)

},[refreshToken,expiresIn])
   
    return accessToken

}