const express = require("express");
const uuid = require("uuid")
const server = express();
server.use(express.json())
server.use(express.static('public'))


//All your code goes here
let activeSessions = {


    
}
server.get('/newgame', (req, res)=>{
    let newID = uuid.v4()
    let newGame = {
        wordToGuess: "apple",
        guesses:[],
        wrongLetters: [],
        closeLetters: [],
        rightLetters: [],
        remainingGuesses: 6,
        gameOver: false
    }
    if(req.query.answer){
        newGame.wordToGuess = req.query.answer
    }
    activeSessions[newID] = newGame
    res.status(201)
    res.send({sessionID: newID}) 
    
    
})
server.get('/gamestate', (req, res)=>{
    let id = req.query.sessionID
 if(id){
    if(!activeSessions[id]){
 res.status(404)
 res.send({error: "id does not match any active session"})
 
}else{
    let gameState = activeSessions[id]
    res.status(200)
    res.send({gameState: gameState})
}
}else if (!id){
    res.status(400)
    res.send({error: "No ID Detected"})
}
    
})
server.post('/guess', (req, res)=>{
    let id = req.body.sessionID
    let guess = req.body.guess
     if(id){
        if(!activeSessions[id]){
            res.status(404)
            res.send({error: "id does not match an active sessions"})
        } else{
        res.status(201)
        res.send({gameState: gameState.guesses.push(newGuess)})
        }
        } else {
        res.status(400)
        res.send({error: "no id found"})
        }

})
server.delete('/reset', (req, res)=>{
    let id = req.query.sessionID
    if(id){
        if(!activeSessions[id]){
            res.status(404)
            res.send({error: "id does not match an active sessions"})
        }else{
        let gameState = activeSessions[id]
        res.status(200)
        res.send({gameState: gameState})
    }
    } else {
        res.status(400)
        res.send({error: "no id found"})
    }
})
server.delete('/delete', (req,res)=>{
    let id = req.query.sessionID
    if(id){
        if(!activeSessions[id]){
            res.status(404)
            res.send({error: "id does not match an active sessions"})
        }else{
        id != activeSessions[id]
        res.status(204)
        res.send({sessionID: id})
        }
    } else {
        res.status(400)
        res.send({error: "no id found"})
    }
})

//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;