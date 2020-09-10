import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Game from "./Pages/Game"

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/game/:gameid" component={Game}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes