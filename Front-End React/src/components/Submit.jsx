import React from "react";

//Button component submits the form and changes display based on where in the game the user is
function Button(props){
    return (
        <input type="submit" 
        id="drawbtn" 
        name={props.name} 
        value={props.value}
        />
    );
}

export default Button;