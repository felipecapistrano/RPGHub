import React from "react"

import GameInfo from "./content/GameInfo"
import GameResources from "./content/GameResources"
import GameCharacter from "./content/sheets/GameCharacter"
import GameSheets from "./content/sheets/GameSheets"
import GameSelfNotes from "./content/GameSelfNotes"
import GameNpcs from "./content/sheets/GameNpcs"

function GameBody ({data, url, permission}) {
    return (
        <>
            <GameInfo description={data.description} genre={data.genre} players={data.players}/>
            <GameResources url={url} permission={permission}/>
            {permission?
            <>
            <GameSheets players={data.players} url={url}/>
            <GameNpcs url={url}/>
            </>: 
            <GameCharacter url={url}/>}
            <GameSelfNotes url={url}/>
        </>
    )
}

export default GameBody