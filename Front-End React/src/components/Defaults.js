//Constants for the button types
const DRAW_BTN = {
    name: "drawcards",
    value: "Draw",
}

const PLAYAGAIN_BTN = {
    name: "playagain",
    value: "Play Again",
}

const NEWGAME_BTN = {
    name: "newgame",
    value: "New Game",
}

const BUTTONS = {
    DRAW_BTN: DRAW_BTN,
    PLAYAGAIN_BTN: PLAYAGAIN_BTN,
    NEWGAME_BTN: NEWGAME_BTN,
};

//Game States
const GAME_STATES = {
    NEW_SESSION: 'new-session',
    NEW_GAME: 'new-game',
    DRAWPHASE: 'draw-phase',
    PLAY_AGAIN: 'play-again',
    GAME_OVER: 'game-over',
};

//Arrays to hold states of individual cards
const selectAll = [true, true, true, true, true];
const deselectAll = [false, false, false, false, false];

//Defaults holds all the constant values
const DEFAULTS = {
    BUTTONS: BUTTONS,
    GAME_STATES: GAME_STATES,
    selectAll: selectAll,
    deselectAll: deselectAll,
}

export {DEFAULTS};