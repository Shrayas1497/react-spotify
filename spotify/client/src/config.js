import axios from "axios"   ;
export const axiosInstance=axios.create({
    baseURL="https://react-better-spotify.herokuapp.com/"
})