import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import {DEFAULTS} from "../Front-End React/src/components/Defaults.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const API_URL = "https://deckofcardsapi.com";
const FRONTEND_PATH = path.join(__dirname, "../Front-End React/dist");

const deckcount = 1;
const totalcards = 5;
const cards = [];

var game_state = DEFAULTS.GAME_STATES.NEW_SESSION;
var deck;
var round = 0;

app.use(express.static(FRONTEND_PATH));
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

//Start the express app.
app.get("/", (req, res) =>{
    res.sendFile("index.html");
});

app.get("/game-state", (req, res) =>{
    res.json({currState: game_state})
});

//Obtain shuffled deck of cards to start the game with
app.get("/init-data", async (req, res) => {
    try{
        const config = {
            params: {deck_count: deckcount}
        }

        //Generate a new deck
        const dInfo = await axios.get(API_URL + "/api/deck/new/shuffle", config);
        deck = dInfo.data.deck_id;

        for(var i=0; i < totalcards; i++){
            cards.push(
            {
                index: i,
                code: "??",
                img: API_URL + "/static/img/back.png",
                value: "??",
                suit: "??", 
            });
        }

        game_state = DEFAULTS.GAME_STATES.NEW_GAME;

        res.json({
            drawncards: cards,
            endgame: false,
            hold: "disabled",
            currRound: round,
            gameState: game_state,
        });

    }catch(error){
        console.log(error);
        res.sendError({content: JSON.stringify(error.response)});
    }
});

//Draw cards according to amount desired
app.post("/draw-cards", async (req, res) =>{
    console.log("draw-time!");

    try{
        var input = req.body;
        console.log('Input \n' + input);
        var currCount = 0;

        //Obtain how many cards are being held
        if(input != null){ 
            currCount = input.length; 
        }else{
            input = [];
        }

        var drawCount = totalcards - currCount;
        console.log(`Count: ${drawCount}`);
        const config = {
            params: {count: drawCount}
        }

        //Draw cards
        const cInfo = await axios.get(API_URL + `/api/deck/${deck}/draw`, config);
        console.log(cInfo.data);
        //Assign cards to open spots
        for(var i=0, j=0; i < totalcards; i++){
            var cardNum = `card${i+1}`;
            if(!(cardNum in input)){
                cards[i].code = cInfo.data.cards[j].code
                cards[i].img = cInfo.data.cards[j].image
                cards[i].value = cInfo.data.cards[j].value
                cards[i].suit = cInfo.data.cards[j].suit
                j++;
            }
        }

        round++;

        if(round < 3){
            game_state = DEFAULTS.GAME_STATES.DRAWPHASE;
            res.json({
                drawncards: cards,
                endgame: false,
                hold: "",
                currRound: round,
                gameState: game_state,
            });
        }else{
            game_state = DEFAULTS.GAME_STATES.GAME_OVER;
            res.json({
                drawncards: cards,
                endgame: true,
                hold: "disabled",
                currRound: round,
                gameState: game_state,
            });
        } 

    }catch(error){
        console.log(error);
        res.sendError({content: JSON.stringify(error.response)});
    }
});

//Shuffle deck and start a new game
app.get("/reshuffle-game", async (req, res)=>{
    try{
        const config = {
            params: {remaining: false}
        }

        const sInfo = await axios.get(API_URL + `/api/deck/${deck}/shuffle/`, config);

        for(var i=0; i < totalcards; i++){
           cards[i] = 
           {
                index: i,
                code: "??",
                img: API_URL + "/static/img/back.png",
                value: "??",
                suit: "??",
           };
        }

        round = 0;
        game_state = DEFAULTS.GAME_STATES.NEW_GAME;

        res.json({
            drawncards: cards,
            endgame: false,
            hold: "disabled",
            currRound: round,
            gameState: game_state,
        });

    }catch(error){
        console.log(error);
        res.send({content: JSON.stringify(error.response)});
    }
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
});