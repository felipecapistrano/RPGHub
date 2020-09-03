import React from "react"
import { Redirect } from "react-router-dom"

function UserLogin () {
    const session = localStorage.getItem("id")

    return (
        <div>
            {!session && <Redirect to="/login"/>}
        </div>
    )
}

export default UserLogin