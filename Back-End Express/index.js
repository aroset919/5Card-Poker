import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const API_URL = "https://deckofcardsapi.com";
const WEB_URL = path.join(__dirname, "../Front-End React/dist");

const deckcount = 1;
const totalcards = 5;
const cards = [];

var deck;
var round = 0;

app.use(express.static(WEB_URL));
app.use(bodyParser.urlencoded({extended : true}));

//Start the express app.
app.get("/", (req, res) =>{
    res.sendFile("index.html");
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
        res.json({
            drawncards: cards,
            endgame: false,
            hold: "disabled",
        });

    }catch(error){
        //res.sendFile(path.join(WEB_URL, "/index.html"), {content: JSON.stringify(error.response)});
        console.log(error);
    }
});

//Draw cards according to amount desired
app.post("/draw-cards", async (req, res) =>{
    try{
        const cardInput = req.body;
        //Determine how many cards to be drawn
        var drawCount = totalcards - Object.keys(cardInput).length + 1;

        const config = {
            params: {count: drawCount}
        }

        //Draw cards
        const cInfo = await axios.get(API_URL + `/api/deck/${deck}/draw`, config);

        //Assign cards to open spots
        for(var i=0, j=0; i < totalcards; i++){
            var cardNum = `card${i+1}`;
            if(!(cardNum in cardInput)){
                cards[i].code = cInfo.data.cards[j].code
                cards[i].img = cInfo.data.cards[j].image
                cards[i].value = cInfo.data.cards[j].value
                cards[i].suit = cInfo.data.cards[j].suit
                j++;
            }
        }
        
        round++;

        //Check Round Condition
        if(round < 3){
            res.render("index.ejs", 
            {
                drawncards: cards,
                endgame: false,
                hold: "",
            });
        }else{
            res.render("index.ejs", 
            {
                drawncards: cards,
                endgame: true,
                hold: "disabled",
            });
        }   
        
    }catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response)});
    }
});

//Shuffle deck and start a new game
app.post("/reshuffle-game", async (req, res)=>{
    try{
        const config = {
            params: {remaining: false}
        }

        const sInfo = await axios.get(API_URL + `/api/deck/${deck}/shuffle/`, config);

        for(var i=0; i < totalcards; i++){
           cards[i] = 
           {
                code: "??",
                img: API_URL + "/static/img/back.png",
                value: "??",
                suit: "??",
           };
        }

        round = 0;
        
        res.render("index.ejs", 
        {
            drawncards: cards,
            endgame: false,
            hold: "disabled",
        });

    }catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response)});
    }
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
});