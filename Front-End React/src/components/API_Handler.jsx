import React from "react";
import axios from "axios";
import {DEFAULTS} from "./Defaults.js";

//Path to the server
const API_URLS = {
    STATE: "http://localhost:3000/game-state",
    INIT: "http://localhost:3000/init-data",
    DRAW: "http://localhost:3000/draw-cards",
    RESHUFFLE: "http://localhost:3000/reshuffle-game",
}

//APIHandler function will call the Express Server based on current game-state
const APIHandler = async(formData) =>{
    try{
        const gameState = await axios.get(`${API_URLS.STATE}`);
        let STATES = DEFAULTS.GAME_STATES;
        let response = {
            data: {
                drawncards: [],
                hold: "disabled",
                currRound: -1,
                gameState: ''
            }
        };

        switch (gameState.data.currState){
            case STATES.NEW_SESSION:
                console.log("Initializing...");
                response = await axios.get(`${API_URLS.INIT}`);
                break;
            case STATES.NEW_GAME:
            case STATES.DRAWPHASE:
                console.log("Drawing...");
                response = await axios.post(`${API_URLS.DRAW}`, formData);
                break;
            case STATES.GAME_OVER:
                console.log("Reshuffling...");
                response = await axios.get(`${API_URLS.RESHUFFLE}`);
                break;
        }

        return response.data;
    }catch(error){
        console.log("Error retrieving data from API: " + error.message + "\n" + error);
        return{
                drawncards: [],
                hold: "disabled",
                currRound: -1,
                gameState: ''
        };
    }
}


export {APIHandler};