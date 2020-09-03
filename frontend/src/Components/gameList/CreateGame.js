import React from "react"
import { IoMdAddCircle } from "react-icons/io"
import { IconContext } from "react-icons";

function CreateGame ({ func }) {
    return (
        <IconContext.Provider value={{ size: "2.5em"}}>
            <div onClick={() => func()} className="game-container center cursor">
                <div id="create-game-button">
                    <IoMdAddCircle/>
                    <h3>Create new game</h3>
                </div>
            </div>
        </IconContext.Provider>
    )
}

export default CreateGame