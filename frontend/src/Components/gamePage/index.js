import React from "react"
import ReactLoading from "react-loading"
import Fadein from "react-fade-in"

import useDataFetch from "../fetch/useDataFetch"
import GamePageHeader from "./GamePageHeader"
import GameBody from "./GameBody"
import InviteScreen from "./inviteScreen"

function GamePage ({id}) {
    const [{data, isLoading, isError}] = useDataFetch(`${id}`)
    function checkPermission() {
        const player = data? data.players.filter(player_id => Number(localStorage.getItem("id")) === player_id): null
        return player === null || player.length === 0 
    }
    if (isLoading) return <ReactLoading className="loading" type="spin"/>
    else if (isError) return <div>The game doesn't exist</div>
    else if (checkPermission()) return <InviteScreen gamename={data? data.gamename: null} id={id}/>
    return (
        <div id="game-container">
            <div id="game-content">
                <GamePageHeader image={data? data.image: null} gamename={data? data.gamename: null}/>
                <GameBody description={data? data.description: null} players={data? data.players: null}/>
            </div>
        </div>
    )
}

export default GamePage