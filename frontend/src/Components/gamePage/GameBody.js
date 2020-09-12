import React from "react"

import GameInfo from "./content/GameInfo"
import GameResources from "./content/GameResources"
import GameCharacters from "./content/GameCharacters"

function GameBody ({data, url, permission}) {
    return (
        <>
            <GameInfo description={data.description} genre={data.genre} players={data.player_names}/>
            <GameResources resources={data.resources} url={url} permission={permission}/>
            <GameCharacters/>
        </>
    )
}

export default GameBody