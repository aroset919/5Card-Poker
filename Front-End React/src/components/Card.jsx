import React, { useState } from "react";

function Card(props){
    var cardNum = props.index + 1;
    var [holdCard, changeSelect] = useState(false);

    function updateState(){
        changeSelect(!holdCard);
    }

    return (
    <div className={`cardhold ${holdCard ? 'select-card' : ''}`}>
        
        <label htmlFor={"cd" + cardNum}>
            <div className={"card slot" + cardNum}>
                <img src={props.img} alt={props.value + " of " + props.suit} />
                <p>Hold</p>
            </div>
        </label>

        <input 
            type="checkbox" 
            checked={holdCard}
            id={"cd" + cardNum} 
            name={"card" + cardNum} 
            value={holdCard ? "Hold" : "Change"}
            onChange={updateState}        
        />
        <br />
    </div>);
}

export default Card; 