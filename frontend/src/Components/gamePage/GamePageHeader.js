import React from "react"

function GamePageHeader ({image, gamename}) {
    return (
        <div id="game-header">
            <img id="game-image" src={image} alt="game"/>
            <div id="game-title">{gamename}</div>
        </div>
    )
}

export default GamePageHeader