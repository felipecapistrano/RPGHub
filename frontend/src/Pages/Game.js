import React from "react"

import Header from "../Components/header"
import GamePage from "../Components/gamePage"

import "../Styles/game.css"

function Game({match}) {
    return(
        <>
            <Header/>
            <GamePage id={match.params.gameid}/>
        </>
    )
}

export default Game