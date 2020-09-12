import React from "react"

import noImage from "../../Assets/noImage.png"

function GamePageHeader ({image}) {
    return (
        <div id="game-header">
            <img id="game-image" src={image? image: noImage} alt="game"/>
        </div>
    )
}

export default GamePageHeader