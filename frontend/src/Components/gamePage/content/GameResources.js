import React, { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { IconContext } from "react-icons";
import { Link } from "react-router-dom"

import Content from "./Content"
import RegisterResources from "./RegisterResources";

function GameResources ({resources, permission, url}) {
    const [modal, setModal] = useState(false)
    const list = Object.keys(resources).map((key) => {
        return(
            <div key={key} className="content-line">
                <Link className="big-font bold" to={{ pathname: resources[key] }} target="_blank">{key.toUpperCase()}</Link>
            </div>)
    })
    
    return (
        <IconContext.Provider value={{ size: "2em"}}>
            <Content name="Resources">
                {list}
                {permission?
                <div onClick={() => setModal(true)} className="add-button cursor">
                    <IoMdAddCircle/>
                </div>: null}
            </Content>
            {modal? <RegisterResources url={url} close={() => setModal(false)}/>: null}
        </IconContext.Provider>
    )
}

export default GameResources