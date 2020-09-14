import React from "react"

import GameInfo from "./content/GameInfo"
import GameResources from "./content/GameResources"
import GameCharacters from "./content/GameCharacters"
import GameSelfNotes from "./content/GameSelfNotes"

function GameBody ({data, url, permission}) {
    return (
        <>
            <GameInfo description={data.description} genre={data.genre} players={data.player_names}/>
            <GameResources url={url} permission={permission}/>
            <GameCharacters/>
            <GameSelfNotes url={url}/>
        </>
    )
}

export default GameBody