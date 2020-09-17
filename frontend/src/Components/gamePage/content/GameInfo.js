import React from "react"

import Content from "./Content"

function GameInfo ({description, genre, players}) {
    return (
        <Content name="Info">
            <div className="content-line">
                <p className="bold">Players:</p>
                <p>{players.map((player) => player.name + " ")}</p>
            </div>
            <div className="content-line">
                <p className="bold">Genre:</p>
                <p>{genre? genre: "This game has no genre."}</p>
            </div>
            <div className="content-line">
                <p className="bold">Description:</p>
                <p>{description? description: "This game has no description."}</p>
            </div>
        </Content>
    )
}

export default GameInfo