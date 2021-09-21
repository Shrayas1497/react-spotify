const express= require('express');
const cors =require("cors")
const bodyParser = require("body-parser")
const lyricsFinder =require("lyrics-finder")
const SpotifyWebApi= require('spotify-web-api-node');

const app = express();
app.use(cors())  
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/refresh',(req,res)=>
  {
const refreshToken =req.body.refreshToken
console.log("hi")
const spotifyApi= new SpotifyWebApi ({
redirectUri:'http://localhost:3000',
clientId:'d250697bb15c4b7eb3448f43218e067e',  
clientSecret:'f9451d653d7b46ed800cb1bb78d6b859',
refreshToken,
    })
    spotifyApi
    .refreshAccessToken()
    .then(data => {
          res.json({
    accessToken:data.body.accessToken,
    expiresIn: data.body.expiresIn
          })
        })
        .catch((err)=>{
            console.log(err)
            res.sendStatus(400)  
        })
    
    })

app.post('/login',(req,res)=>
{
const code = req.body.code
const spotifyApi= new SpotifyWebApi ({
redirectUri:'http://localhost:3000',
clientId:'d250697bb15c4b7eb3448f43218e067e',  
clientSecret:'f9451d653d7b46ed800cb1bb78d6b859',
})


spotifyApi
.authorizationCodeGrant(code)
.then(data =>
    { 
      res.json({
          
        
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in
        
        })
    } )
    .catch((err)=>{
       console.log(err)
        res.sendStatus(400)
        
  
    })
})

app.get('lyrics',async(req,res) =>{
const lyrics =await lyricsFinder(req.query.artist,req.query.track) || 'no lyrics found'
res.json({lyrics})
})
app.listen(3001)
