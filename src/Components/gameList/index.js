import React, { useState } from "react"
import ReactLoading from "react-loading"

import CreateGame from "./CreateGame"

import RegisterGame from "./RegisterGame"


function Games () {
    const [modal, setModal] = useState(false)
    //const [{data, isLoading}] = useDataFetch("/getgame")

    return (
        <>
        <div className="game-list">
            <h1>Your Games</h1>
            <CreateGame func={() => setModal(true)}/>
            <ReactLoading className="loading" type="spin"/>
        </div>
        {modal && <RegisterGame close={() => setModal(false)}/>}
        </>
    )
}

export default Games