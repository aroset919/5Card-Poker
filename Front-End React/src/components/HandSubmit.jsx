import React, {useState} from "react";
import PokerHand from "./PokerHand.jsx";
import Button from "./Submit.jsx";

function HandSubmit(){
    var drawButton = {
    name: "drawcards",
    value: "Draw",
    formaction: "/draw-cards"
  }

  var playAgainButton = {
    name: "newgame",
    value: "Play Again",
    formaction: "/reshuffle-game"
  }

  var [round, updateRound] = useState(0);
  var [buttonInfo, updateButton] = useState(drawButton);
  var [gameover, updateGameOver] = useState(false);

  function newRound(){
    if(round===3){
      updateRound(0);
      updateButton(playAgainButton);
      updateGameOver(true);


    }else if(round===0){
      updateRound(round+1);
      updateButton(drawButton);
      updateGameOver(false);
    }else{
      updateRound(round+1);
    }
  }

  return (
    //<form id="cardSubmit" method="post">
    <div>
      <PokerHand />
      
      {gameover ? <h2>Game Over!</h2> : null}
      <div>
          <Button 
              click={newRound}
              name={buttonInfo.name}
              value={buttonInfo.value}
              //formaction={buttonInfo.formaction}
          />
      </div>
    </div>
    //</form>
  );
}

export default HandSubmit;