import React from "react";
import Card from "./Card.jsx";

//The Poker Hand components holds the cards in the current poker hand
function PokerHand(props){
  function MapCards(drawnCard, index){
   return (
    <Card 
        key={index}
        index={index}
        img={drawnCard.img}
        value={drawnCard.value}
        suit={drawnCard.suit}
        selectCard={props.selectCards[index]}
        updateSelected={props.updateSelected}
    />
    );
  }

  return (
    <div className="poker-hand">
      {props.cardColl != null && props.cardColl.map(MapCards)}
    </div>
  );
}

export default PokerHand;