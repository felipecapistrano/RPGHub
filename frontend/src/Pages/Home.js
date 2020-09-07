import React from "react"

import UserLogin from "../Components/session/UserLogin"
import Games from "../Components/gameList"

import "../Styles/home.css"

function Home () {
    return (
        <div id="home-container">
            <UserLogin/>
            <Games/>
        </div>
    )
}

export default Home