import React, { useState } from "react"
import ReactLoading from "react-loading"

import useDataFetch from "../fetch/useDataFetch"

import CreateGame from "./CreateGame"
import RegisterGame from "./RegisterGame"
import GameCard from "./GameCard"


function GameList () {
    const id = Number(localStorage.getItem("id"))
    const [modal, setModal] = useState(false)
    const [{data, isLoading}] = useDataFetch(`games/${id}`)

    const userGames = !data? "loading": data.map((game) => {
        return (
            <GameCard
            key={game.id}
            id={game.id}
            name={game.gamename} 
            description={game.description}
            owner={game.owner_id === id? true: false}
            image={game.image}/>
        )
    })

    return (
        <div id="home-container">
            <div className="game-list">
                <h1>Your Games</h1>
                <CreateGame func={() => setModal(true)}/>
                {isLoading? 
                <ReactLoading className="loading" type="spin"/>:
                userGames}
            </div>
            {modal && <RegisterGame close={() => setModal(false)}/>}
        </div>
    )
}

export default GameList