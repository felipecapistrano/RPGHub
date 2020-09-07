import React from "react"

function GameCard ({name, description, image}) {
    return (
        <div className="game-container cursor">
            <img className="game-image" src={image} alt="Game"/>
            <div className="game-header">
                <h3>{name}</h3>
                <p>{description? description: "This game has no description"}</p>
            </div>
        </div>
    )
}

export default GameCard