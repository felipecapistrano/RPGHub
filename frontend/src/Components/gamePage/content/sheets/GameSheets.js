import React, { useEffect, useState } from "react"
import { AiFillEdit } from "react-icons/ai"
import { IconContext } from "react-icons/lib"
import axios from "axios"

import Content from "../Content"
import RegisterSheet from "../RegisterSheet"
import baseUrl from "../../../fetch/url"
import CharacterCard from "./CharacterCard"

function GameSheets ({url, players}) {
    const [modal, setModal] = useState(false)
    const [user, setUser] = useState()
    const [character, setCharacter] = useState()

    
    const sheetButtons = players.map((player) => {
        if (player.id === Number(localStorage.getItem("id"))) return null
        return (
            <div key={player.id} style={{marginBottom:"100px", justifyContent:"flex-start"}} className="form-line">
                <p style={{marginRight: "10px"}} className="cursor bold" onClick={() => setUser(player.id)}>{player.name}</p>
                {character === player? <p>{"<--"}</p>:null}
            </div>
        )
    })

    const sheet = character?(
    <>
        <div style={{display:"flex", justifyContent: "center"}}>
            <CharacterCard name={character.name} image={character.image}/>
        </div>
        {character.fields.map((field) => {
            return(
            <div key={field.name} className="form-line">
                <label>{field.name}</label>
                {field.type === "text"? 
                <input disabled className={`content-${field.type}`} style={{width: "70%", margin: "10px"}}>{field.value}</input>:
                <textarea disabled className={`content-${field.type}`} style={{width: "70%", margin: "10px"}}>{field.value}</textarea>}
            </div>)
        })}
    </>
    ): 
    null
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const result = await axios.post(baseUrl + `games/getcharacter`, {user_id: user, game_id: url})
                    setCharacter(result.data)
                }
            }catch(error) {
                alert(error)
            }
        }
        fetchData()
    }, [url, user])

    return (
        <>
            <Content name="Sheets">
                <IconContext.Provider value={{ size: "1.5em"}}>
                    <div style={{display:"flex", justifyContent:"center"}} onClick={() => setModal(true)} className="cursor">
                        <AiFillEdit/>
                        <p>Edit sheet</p>
                    </div>
                    {sheetButtons}
                    {sheet}
                </IconContext.Provider>
            </Content>
            
            {modal? <RegisterSheet url={url} close={() => setModal(false)}/>: null}
        </>
    )
}

export default GameSheets