import React from "react"
import { useHistory } from "react-router"
import axios from "axios"

import baseUrl from "../../fetch/url"
import Button from "../../Button"
import "./invitescreen.css"

function InviteScreen({gamename, id}) {
    const history = useHistory()
    async function joingame() {
        try {
            console.log({user_id: localStorage.getItem("id"), game_id: id})
            await axios.post(baseUrl + "games/adduser", {user_id: Number(localStorage.getItem("id")), game_id: id})
            history.go(`/game/${id}`)
        }catch(err) {
            alert(err)
        }
    }
    return (
        <div id="invite-container">
            <p>You were invited to</p>
            <p className="bold">{gamename}</p>
            <Button func={joingame} text="Click here to join" classes="button"/>
        </div>
    )
}

export default InviteScreen