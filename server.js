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
        res.status(200)
        res.send({gameState: gameState})
    }else{
       res.status(400)
       res.send({error: "No ID Detected"})
    }
})
server.post('/guess', (req, res)=>{
    let id = req.body.sessionID
    let guess = req.body.guess
    if(id){
        let guessArray = guess.split('')
        let gameState = activeSessions[id]
        for(i = 0; i < guessArray.length; i++){
        if(guessArray[i] = newGame.wordToGuess[i]) {
            console.log('RIGHT')
        } else if(guessArray[i] = ) {

        }
        }

        
        let guesses = [
            {value:guessArray[0], result:},
            {value:guessArray[1], result:},
            {value:guessArray[2], result:},
            {value:guessArray[3], result:},
            {value:guessArray[4], result:},
        ]
        let remaining = {
            wrongLetters:[],
            closeLetters:[],
            rightLetters:[],
            remaining: 4,
            gameOver: false
        }
        
        res.status(201)
        res.send({gameState: gameState})
        
    } else {
        res.status(400)
        res.send({error: "no id found"})
    }
})
//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;