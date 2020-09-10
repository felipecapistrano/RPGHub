import React from "react"
import { useHistory } from "react-router"

import "../../Styles/header.css"

import icon from "../../Assets/logo.png"


function Header () {
    const history = useHistory()
    return (
        <header id="header">
            <div id="header-icon">
                <img onClick={() => history.push("/")} className="cursor" src={icon} alt="icon"></img>
            </div>
            <div id="header-content">

            </div>
            <div id="header-login">
                
            </div>
        </header>
    )
}

export default Header