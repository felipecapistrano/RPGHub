import React from "react"

import noImage from "../../../../Assets/noImage.png"

import "./card.css"

function CharacterCard ({name, image}) {
    return (
        <>
            <div className="character-name">
                {name}
            </div>
            <img className="character-image" style={{width:"300px", height:"450px", alignSelf: "center"}} src={image? image: noImage} alt="game"/>
        </>
    )
}

export default CharacterCard