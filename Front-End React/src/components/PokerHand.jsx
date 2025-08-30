import React, {useState} from "react";
import Card from "./Card.jsx";
import Button from "./Submit.jsx";

var cardColl = [
  {
    index: "0",
    image: "https://img.pixers.pics/pho_wat(s3:700/FO/54/86/98/31/700_FO54869831_6577459d8a01672615ca344481beace8.jpg,518,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,298,650,jpg)/wall-murals-playing-card-king-of-club.jpg.jpg",
    value: "King",
    suit: "Club"
  },
  {
    index: "1",
    image: "https://tattoosandscarssaloon.com/cdn/shop/products/b6eaeca7e466f2767ad763451deab923_2000x.jpg?v=1662575692",
    value: "Ace",
    suit: "Spade"
  },
  {
    index: "2",
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/blank-playing-card-queen-spades-bigalbaloo-stock.jpg",
    value: "Queen",
    suit: "Spade"
  },
  {
    index: "3",
    image: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/436/2D__57497__49826.1681470474.jpg?c=1",
    value: "Two",
    suit: "Diamond"
  },
  {
    index: "4",
    image: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/438/9D__67286__64203.1681313264.jpg?c=1",
    value: "Nine",
    suit: "Diamond"
  }
]

function MapCards(drawnCard, index){
   return (
    <Card 
        key={index}
        index={index}
        img={drawnCard.image}
        value={drawnCard.value}
        suit={drawnCard.suit}
    />
    );
}

function PokerHand(){
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
  var [gameover, updateGameOver] = useState(false)

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
      <div className="poker-hand">
        {cardColl.map(MapCards)}
      </div>
      
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

export default PokerHand;