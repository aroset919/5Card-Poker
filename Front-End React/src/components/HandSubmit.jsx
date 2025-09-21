import React from "react";
import PokerHand from "./PokerHand.jsx";
import Button from "./Submit.jsx";
import GameOver from "./GameOver.jsx";


//The Form Submit component holds information concerning the poker hand, which is submitted when the user selects the 'Draw' button
function HandSubmit(props){
  return (
    <form id="cardSubmit" onSubmit={props.formSubmit}>
      <PokerHand 
        selectCards={props.selectCards}
        updateSelected={props.cardSelected}
        cardColl={props.cardColl}
        isDisabled={props.isDisabled}
      />
      
      {props.gameover ? <GameOver />: null}
      <div>
          <Button
              name={props.buttonInfo.name}
              value={props.buttonInfo.value}
          />
      </div>
    </form>
  );
}

export default HandSubmit;