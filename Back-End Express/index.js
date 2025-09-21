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

//internal middleware method to return the current poker hand --flush, straight, high card, etc--

//Function matchCheck checks for pairs, trips, four of a kind, and full houses
function matchCheck(hand){
    let match = 0;
    let pairFound = false;
    let tripsFound = false;

    let count = hand.reduce((acc, curr) => {
        acc[curr.val] = (acc[curr.val] || 0) + 1;
        return acc;
    }, {});
    
    Object.keys(count).forEach((key)=>{
        switch(count[key]){
            case 4:
                match = 4;
                break;
            case 3:
                if(pairFound){
                    match = 5;
                }else{
                    match = 3;
                    tripsFound = true;
                }
                break;
            case 2:
                if(tripsFound){
                    match = 5;
                }else if(pairFound){
                    match = 2;
                }else{
                    match = 1;
                    pairFound = true;
                }
                break;
        }
    });

    return match;
}

//Function straightCheck checks for a straight
function straightCheck(hand){
    var isStraight = true;
    
    for(var i=0; i < totalcards-1; i++){
        let diff = hand[i+1].val - hand[i].val;

        if(hand[i+1].val == 14 && hand[i].val == 5){
            diff = 1;
        }

        if(!(diff == 1)){
            isStraight = false;
            break;
        }
    }

    return isStraight;
}

//Function flushCheck checks for a flush
function flushCheck(hand){
    var isFlush = true;
    let suitStart = hand[0].suit;
    hand.forEach((e)=>{
        if(!(e.suit == suitStart))
            isFlush = false;
    });

    return isFlush;
}

//Function royalCheck Checks for the Royal Straight Flush
function royalCheck(hand){
    let start = 10;
    var isRoyal = true;
    hand.forEach((e)=>{
        if(!(start == e.val)){
            isRoyal = false;
        }
        start++;
    });

    return isRoyal;
}

//Function handCheck checks the current hand and returns the name of the poker hand
function handCheck(){
    let hand = []
    var pokerHand = '';

    cards.forEach((e) =>{
        let val = e.code.charAt(0);
        let suit = e.code.charAt(1);

        switch(val){
            case '0':
                val='10';
                break;
            case 'J':
                val='11';
                break;
            case 'Q':
                val='12';
                break;
            case 'K':
                val='13';
                break;
            case 'A':
                val='14';
                break;
        }

        hand.push({
            val: val,
            suit: suit
        });
    });

    hand.sort((a,b) => a.val - b.val);

    let isFlush = flushCheck(hand);
    let isStraight = straightCheck(hand);
    let matches = matchCheck(hand);

    if(isFlush && isStraight){
        if(royalCheck(hand)){
            pokerHand = "Royal Flush";
        }else{
            pokerHand = "Straight Flush";
        }
    }else if(matches == 4){
        pokerHand = "Four of a Kind";
    }else if(matches == 5){
        pokerHand = "Full House";
    }else if(isFlush){
        pokerHand = "Flush";
    }else if(isStraight){
        pokerHand = "Straight";
    }else if(matches == 3){
        pokerHand = "Three of a Kind";
    }else if(matches == 2){
        pokerHand = "Two Pair";
    }else if(matches == 1){
        pokerHand = "Pair";
    }else{
        let highCard = hand[hand.length-1].val;

        if(highCard == 14){
            highCard = "Ace";
        }else if(highCard == 13){
            highCard = "King";
        }else if(highCard == 12){
            highCard = "Queen";
        }else if(highCard == 11){
            highCard = "Jack";
        }
        pokerHand = `${highCard} High`;
    }

    return pokerHand;
}


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

        cards.length = 0;
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
            hold: true,
            currRound: round,
            gameState: game_state,
            pokerHand: "",
        });

    }catch(error){
        console.log(error);
        res.send({content: JSON.stringify(error.response)});
    }
});

//Draw cards according to amount desired
app.post("/draw-cards", async (req, res) =>{
    try{
        var input = req.body;
        var currCount = 0;

        //Obtain how many cards are being held
        if(input != null){ 
            currCount = input.length; 
        }else{
            input = [];
        }

        var drawCount = totalcards - currCount;
        const config = {
            params: {count: drawCount}
        }

        //Draw cards
        const cInfo = await axios.get(API_URL + `/api/deck/${deck}/draw`, config);
        const data = cInfo.data;

        //Assign cards to open spots
        for(var i=0, j=0; i < totalcards; i++){
            let cardNum = `card${i+1}`;

            if(!(input.includes(cardNum))){
                cards[i].code = data.cards[j].code;
                cards[i].img = data.cards[j].image;
                cards[i].value = data.cards[j].value;
                cards[i].suit = data.cards[j].suit;
                j++;
            }
        }

        round++;
        var pokerHand = handCheck();

        if(round < 3){
            game_state = DEFAULTS.GAME_STATES.DRAWPHASE;
            res.json({
                drawncards: cards,
                hold: false,
                currRound: round,
                gameState: game_state,
                pokerHand: pokerHand,
            });
        }else{
            game_state = DEFAULTS.GAME_STATES.GAME_OVER;
            res.json({
                drawncards: cards,
                hold: true,
                currRound: round,
                gameState: game_state,
                pokerHand: pokerHand,
            });
        } 

    }catch(error){
        console.log(error);
        res.send({content: JSON.stringify(error.response)});
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
            hold: true,
            currRound: round,
            gameState: game_state,
            pokerHand: "",
        });

    }catch(error){
        console.log(error);
        res.send({content: JSON.stringify(error.response)});
    }
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
});