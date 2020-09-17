import React from "react"
import ReactLoading from "react-loading"

import useDataFetch from "../fetch/useDataFetch"
import GamePageHeader from "./GamePageHeader"
import GameBody from "./GameBody"
import InviteScreen from "./inviteScreen"

function GamePage ({url}) {
    const [{data, isLoading, isError}] = useDataFetch(`${url}`)
    function checkPermission() {
        const player = data.players.map((player) => player.id).filter(player_id => Number(localStorage.getItem("id")) === player_id)
        return player === null || player.length === 0 
    }
    if (isLoading) return <ReactLoading className="loading" type="spin"/>
    else if (isError) return <div>The game doesn't exist</div>
    else if (checkPermission()) return <InviteScreen gamename={data.gamename} id={url}/>
    return (
        <div id="game-container">
            <div id="game-content">
                <GamePageHeader image={data.image}/>
                <GameBody data={data} url={url} permission={data.owner_id === Number(localStorage.getItem("id"))}/>
            </div>
        </div>
    )
}

export default GamePage