import React, {useRef, useState, useEffect} from "react";
import {DEFAULTS} from "./Defaults.js";
import {APIHandler} from "./API_Handler.jsx";
import HandSubmit from "./HandSubmit";

//Behavior manager holds states and sends the appropriate values to perform front-end behavior
function BehaviorManager(){
    //Initialize Values
    var [gameData, updateGame] = useState({
        Game_State: DEFAULTS.GAME_STATES.NEW_SESSION,
        currHand: [],
        currBtn: DEFAULTS.BUTTONS.NEWGAME_BTN,
        round: -1,
    });
    var refRender = useRef(true);
    var [selectCards, updateSelected] = useState(DEFAULTS.deselectAll);
    var [formData, updateFormData] = useState([]);

    //Handle API call to update data
    useEffect(()=> {
        if(refRender.current){
            refRender.current = false;
            const getData = async() =>{
                try{
                    const newData = await APIHandler(formData);
                    updateGame({
                        ...gameData,
                        currHand: newData.drawncards,
                        round: newData.currRound,
                        Game_State: newData.gameState,
                    });
                }catch (err) {
                    console.log("Error Displaying New Data: \n" + err.message);
                }
            }

            getData();
        }
    }, [formData, gameData]);

    //Call when a card is selected to apply styles
    function cardSelected(index){
        var newCardSelection = selectCards.with(index, (!selectCards[index]));
        updateSelected(newCardSelection);
    }

    //Call when button is clicked and parse the submission data
    async function newRound(event){
        event.preventDefault();
        refRender.current=true;
        const userData = new FormData(event.target).getAll("card");
            userData.forEach((item, index)=>{
                if(item === "Hold"){
                    userData[index]=`card${index+1}`
                    userData.splice(index+1, 1);
                }
            });

        let filteredChoices = userData.filter((item) =>{return !(item === "Change");});
        updateFormData(filteredChoices);
    }

    return (
        <HandSubmit
            formSubmit={newRound}
            cardSelected={cardSelected}
            gameover={
                (gameData.Game_State == DEFAULTS.GAME_STATES.GAME_OVER ? true : false)
            }
            selectCards={selectCards}
            cardColl={gameData.currHand}
            buttonInfo={gameData.currBtn}
        />
    );


}

export default BehaviorManager;