import React, { useState } from "react";

function Card(props){
    var cardNum = props.index;
    var [holdCard, changeSelect] = useState("false");

    function updateState(){
        changeSelect(!holdCard);
    }

    return (
    <div className="cardhold" onClick={updateState}>
        <div className={"card slot" + cardNum}>
            <img src={props.img} alt={props.value + " of " + props.suit} />
        </div>

        <input 
            type="checkbox" 
            id={"cd" + cardNum} 
            name={"card" + cardNum} 
            value="Hold" 
            checked={holdCard}/>

            <label for={"cd" + cardNum}>Hold</label>
        <br />
    </div>);
}

export default Card;