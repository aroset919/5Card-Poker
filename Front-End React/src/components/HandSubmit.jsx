import React, {useState} from "react";
import PokerHand from "./PokerHand.jsx";
import Button from "./Submit.jsx";
import GameOver from "./GameOver.jsx";

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

  var selectAll = [];
  var deselectAll = [];
  cardColl.forEach(()=>{
    selectAll.push(true);
    deselectAll.push(false);
  })


  var [round, updateRound] = useState(0);
  var [buttonInfo, updateButton] = useState(drawButton);
  var [gameover, updateGameOver] = useState(false);
  var [selectCards, updateSelected] = useState(deselectAll)

  function cardSelected(index){
    var newCardSelection = selectCards.with(index, (!selectCards[index]));
    updateSelected(newCardSelection);
  }

  function newRound(){
    switch(round){
      case 3:
        updateButton(playAgainButton);
        updateGameOver(true);
        updateSelected(selectAll);
        break;
      case 4:
        updateRound(0);
        updateButton(drawButton);
        updateGameOver(false);
        updateSelected(deselectAll)
        break;
      default:
        break;
    }

    if(round!=4){updateRound(round+1);}
  }

  return (
    //<form id="cardSubmit" method="post">
    <div>
      <PokerHand 
        selectCards={selectCards}
        updateSelected={cardSelected}
        cardColl={cardColl}
      />
      
      {gameover ? <GameOver />: null}
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