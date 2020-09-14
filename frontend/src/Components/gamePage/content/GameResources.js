import React, { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { IconContext } from "react-icons";
import { Link, useHistory } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai"
import axios from "axios";


import Content from "./Content"
import RegisterResources from "./RegisterResources"
import useDataFetch from "../../fetch/useDataFetch"
import baseUrl from "../../fetch/url"

function GameResources ({permission, url}) {
    const [{data, isLoading}] = useDataFetch(`games/resources/${url}`)
    const [modal, setModal] = useState(false)
    const history = useHistory()

    async function deleteResource(id) {
        await axios.post(baseUrl + "games/removeresource", {id: id})
        history.go()
    }

    if (isLoading) return null

    const list = data.map((resource) => {
        return(
            <div key={"oi"} className="flex-end content-line">
                <Link className="big-font bold" to={{ pathname: resource["link"] }} target="_blank">{resource["name"].toUpperCase()}</Link>
                {permission?<AiFillDelete onClick={() => deleteResource(resource["id"])} className="cursor"/>: null}
            </div>
        )
    })

    return (
        <IconContext.Provider value={{ size: "1.5em"}}>
            <Content name="Resources">
                {list.length === 0? <p>No resources have been added.</p>: list}
                {permission?
                <IconContext.Provider value={{ size: "2em"}}>
                    <div onClick={() => setModal(true)} className="add-button cursor">
                        <IoMdAddCircle/>
                    </div>
                </IconContext.Provider>: 
                null}
            </Content>
            {modal? <RegisterResources url={url} close={() => setModal(false)}/>: null}
        </IconContext.Provider>
    )
}

export default GameResources