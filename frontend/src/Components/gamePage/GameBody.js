import React from "react"

import GameInfo from "./content/GameInfo"

function GameBody ({description, players}) {
    return (
        <GameInfo description={description} players={players}/>
    )
}

export default GameBody