import React from "react";

//The Card component displays information for the current card and behavior based on selection
function Card(props){
    var cardNum = props.index + 1;

    return (
    <div className={`cardhold ${props.selectCard ? 'select-card' : ''}`}>
        
        <label htmlFor={"cd" + cardNum}>
            <div className={"card slot" + cardNum}>
                <img src={props.img} alt={props.value + " of " + props.suit} />
                <p>Hold</p>
            </div>
        </label>

        <input 
            type="checkbox" 
            checked={props.selectCard}
            id={"cd" + cardNum} 
            name={"card"} 
            value={props.selectCard ? "Hold" : "Change"}
            onClick={()=>props.updateSelected(props.index)}        
        />

        <input 
            type="hidden"
            id={"hidecd" + cardNum}
            name={"card"}
            value={"Change"}
        />
        <br />
    </div>);
}

export default Card; 