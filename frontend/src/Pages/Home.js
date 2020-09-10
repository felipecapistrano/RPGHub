import React from "react"

import UserLogin from "../Components/session/UserLogin"
import GameList from "../Components/gameList"
import Header from "../Components/header"

import "../Styles/home.css"

function Home () {
    return (
        <>
            <Header/>
            <UserLogin/>
            <GameList/>
        </>
    )
}

export default Home