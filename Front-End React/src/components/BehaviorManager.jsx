import React, {useState, useEffect} from "react";
import {DEFAULTS} from "./Defaults.jsx";
import { InitializeDeck} from "./API_Handler.jsx";
import HandSubmit from "./HandSubmit";

//Behavior manager holds states and sends the appropriate values to perform front-end behavior
function BehaviorManager(){
    //Initialize Values
    var [gameData, updateData] = useState({
        Game_State: DEFAULTS.GAME_STATES.NEW_GAME,
        currHand: [],
        currBtn: DEFAULTS.BUTTONS.NEWGAME_BTN,
        round: -1,
        gameover: false,
    });
    var [selectCards, updateSelected] = useState(DEFAULTS.deselectAll);
    var [effect, toggleEffect] = useState(false);

    //Initialize Deck and Load Data
    useEffect(()=> {
        const getData = async () => {
            try {
                const data = await InitializeDeck();
                updateData({
                    ...gameData,
                    currHand: data.drawncards,
                    round: data.currRound,
                    gameover: data.endgame,
                });
            } catch (err) {
                console.log("Error Displaying Data: \n" + err.message);
            }
        }

        getData();
    }, []);

    //Call when a card is selected to apply styles
    function cardSelected(index){
        var newCardSelection = selectCards.with(index, (!selectCards[index]));
        updateSelected(newCardSelection);
    }

    //Called on Form Submit
    useEffect(()=>{
        //logic for button click on new round here
    }, []);


    //Call when button is clicked
    function newRound(event){
        event.preventDefault();
        console.log("Click!\n" + gameData.currHand);
        toggleEffect(!effect);
    }

    return (
        <HandSubmit
            formSubmit={newRound}
            cardSelected={cardSelected}
            updateCurrentHand={updateData}
            gameover={gameData.gameover}
            selectCards={selectCards}
            cardColl={gameData.currHand}
            buttonInfo={gameData.currBtn}
        />
    );


}


/**
//Behavior Manager holds states and determines behavior based on user choices
function BehaviorManager(){      

    //Call on new round
    function newRound(event){
        event.preventDefault();

        if(newSession){
            updateGameState(DEFAULTS.GAME_STATES.NEW_SESSION);
            //InitGame();
        }else{
            console.log("Not new session");
        /**
            if(gameover){
                console.log("GameOver Here\n");
                //let newData = HandlePlayAgain();
                updateCurrentHand(newData.newHand);
                updateButton(NEWGAME_BTN);
                updateGameOver(newData.gameover);
                updateRound(newData.round);
                updateSelected(deselectAll);
                updateNewGame(true);
        

            }else if(newgame){
                updateButton(DRAW_BTN);
            }else{
                const formData = new FormData(event.target).getAll("card");
                formData.forEach((item, index)=>{
                    if(item === "Hold"){
                        formData[index]=`card${index+1}`
                        formData.splice(index+1, 1);
                    }
                });

                let filteredChoices = formData.filter((item) =>{return !(item === "Change");});
                
                console.log("Here is the Form Data: \n" + formData + "\nHere is the filtered Data: \n" + filteredChoices);

                //let newData = HandleDraw(filteredChoices);

                //updateGameOver(newData.gameover);
                //updateRound(newData.round);
                //updateCurrentHand(newData.newHand);

                if(gameover){
                    updateButton(PLAYAGAIN_BTN);
                    updateSelected(selectAll);
                }
            }
            
        }
    }

}


*/
export default BehaviorManager;