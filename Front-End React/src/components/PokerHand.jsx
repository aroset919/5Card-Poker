import React from "react";
import Card from "./Card.jsx";

function PokerHand(props){
  function MapCards(drawnCard, index){
   return (
    <Card 
        key={index}
        index={index}
        img={drawnCard.image}
        value={drawnCard.value}
        suit={drawnCard.suit}
        selectCard={props.selectCards[index]}
        updateSelected={props.updateSelected}
    />
    );
  }

  return (
    <div className="poker-hand">
      {props.cardColl.map(MapCards)}
    </div>
  );
}

export default PokerHand;