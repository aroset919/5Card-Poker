import React from "react";

//Header for the webpage; instructions are included in the header
function Header(){
    return (
    <div className="instructions">
        <h1>5-Card Poker</h1>
        <p>5-Card Poker is a popular game where players try to make the best five-card poker hand after a single draw. <br />
            In this simulator, you will get <span className="bold-word">three</span> draws. 
            Try to make the highest hand possible! </p>
    </div>);
}

export default Header;