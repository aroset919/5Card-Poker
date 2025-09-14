import React from "react";
import axios from "axios";

//Path to the server
const API_URLS = {
    INIT: "http://localhost:3000/init-data",
    DRAW: "http://localhost:3000/draw-cards",
    RESHUFFLE: "http://localhost:3000/reshuffle-game",
}

//InitializeDeck function will initialize a new deck and return it
const InitializeDeck = async () => {
    try{
        const response = await axios.get(`${API_URLS.INIT}`);
        return response.data;
    }catch(error){
        console.log("Unable to load deck from API-init-data: " + error.message + "\n" + error);
        return{
                drawncards: [],
                endgame: false,
                hold: "disabled",
                currRound: -1,
        };
    }
};

/**
//HandleDraw function will draw the cards based on passed over form data
async function HandleDraw(formData, gameData, updateGameData){
    console.log("Drawing Next Hand...");
    try{
        const response = await axios.post(`${API_URLS.DRAW}`, formData);
        console.log("Response Cards! \n", response.data.drawncards);
        updateGameData({
            ...gameData,
            currHand: response.data.drawncards,
            round: response.data.currRound,
            gameover: response.data.endgame,
        });
    }catch(error){
        console.log("Unable to load deck from API-draw-hand: " + error.message + "\n" + error);
        updateGameData({
            ...gameData,
            currHand: [],
            round: -1,
        });
    }

    console.log("Hand Draw Complete!");
}

//HandlePlayAgain function will start a new game using the same deck
async function HandlePlayAgain(gameData, updateGameData){
    console.log("Reshuffling...");
    try{
        const response = await axios.get(`${API_URLS.RESHUFFLE}`);
        console.log("Response Cards! \n", response.data.drawncards);
        updateGameData({
            ...gameData,
            currHand: response.data.drawncards,
            round: response.data.currRound,
            gameover: response.data.endgame,
        });
    }catch(error){
        console.log("Unable to load deck from API-reshuffle: " + error.message + "\n" + error);
        updateGameData({
            ...gameData,
            currHand: [],
            round: -1,
        });
    }

    console.log("Deck shuffled!")
}

*/

export {InitializeDeck};