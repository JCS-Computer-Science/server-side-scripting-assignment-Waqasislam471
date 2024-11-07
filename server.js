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
    if(id) {
        let gameState = activeSessions[id]
        // if(id != gameState){
        //     res.status(404)
        //     res.send({error: "SessionID does not match any active sessions"})
        // } else{
        res.status(200)
        res.send({gameState: gameState})
        // }
    } else {
       res.status(400)
       res.send({error: "No ID Detected"})
    }
})
server.post('/guess', (req, res)=>{
    let id = req.body.sessionID
    let guess = req.body.guess
    if(guess < 5 || guess > 5){
        res.status(400)
        res.send({error: "please state valid guess"})
    } else if(id){
        let guessArray = guess.split('')
        let wordArray = wordToGuess.split('')
        let gameState = activeSessions[id]
        let newGuess  = []
    
    for(j=0; j < guessArray.length; j++) {
    for(i = 0; i < guessArray.length; i++) {
    if(guessArray[i] = wordArray[i]){
        console.log('RIGHT')
    } else if(guessArray[j] = wordArray[i]){
        console.log('CLOSE')
    } else {
        console.log('WRONG')
    }
        guesses = [
        {value:[0], result:1}
    ]
    wrongLetters = [i],
    closeLetter = [i],
    rightLetters = [i]
}
    }
    
    res.status(201)
        res.send({gameState: gameState.guesses.push(newGuess)})
        } else {
        res.status(400)
        res.send({error: "no id found"})
    }

})
server.delete('/reset', (req, res)=>{
    let id = req.query.sessionID
    if(id){

    } else {
        res.status(400)
        res.send({error: "no id found"})
    }
})
server.delete('/delete', (req,res)=>{
    let id = req.query.sessionID
    if(id){

    } else {
        res.status(400)
        res.send({error: "no id found"})
    }
})

//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;