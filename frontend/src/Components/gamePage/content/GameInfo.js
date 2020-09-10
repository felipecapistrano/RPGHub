import React from "react"

import Content from "./Content"

function GameInfo ({description, players}) {
    return (
        <Content name="Game Info">
            <p>Description: {description}</p>
            <p>Players: {players}</p>
        </Content>
    )
}

export default GameInfo