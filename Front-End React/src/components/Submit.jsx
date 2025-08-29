import React from "react";

function Button(props){
    return (
        <input type="submit" 
        id="drawbtn" 
        name={props.name} 
        value={props.value}
        //formaction={props.action}
        onClick={props.click}/>
    );
}

export default Button;