import React, { useState, useEffect } from "react"
import ReactLoading from "react-loading"

import useDataFetch from "../fetch/useDataFetch"

import CreateGame from "./CreateGame"
import RegisterGame from "./RegisterGame"
import GameCard from "./GameCard"


function Games () {
    const id = localStorage.getItem("id")
    const [modal, setModal] = useState(false)
    const [{data, isLoading}] = useDataFetch(`games/${id}`)

    const userGames = !data? "loading": data.map((game) => {
        return (
            <GameCard name={game.gamename} description={game.description} image={game.image}/>
        )
    })

    return (
        <>
        <div className="game-list">
            <h1>Your Games</h1>
            <CreateGame func={() => setModal(true)}/>
            {isLoading? 
            <ReactLoading className="loading" type="spin"/>:
            userGames}
        </div>
        {modal && <RegisterGame close={() => setModal(false)}/>}
        </>
    )
}

export default Games