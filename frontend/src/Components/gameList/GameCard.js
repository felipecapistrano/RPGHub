import React from "react"
import { useHistory } from "react-router"
import { FaUserTie, FaUser } from "react-icons/fa"

import noImage from "../../Assets/noImage.png"

function GameCard ({id, name, genre, description, image, owner}) {
    const history = useHistory()
    return (
        <div onClick={() => history.push(`/game/${id}`)} className="game-container cursor">
            <img className="game-image" src={image? image: noImage} alt="Game"/>
            <div className="game-header">
                <div className="game-title">
                    <h3>{name}</h3>
                    {owner? <FaUserTie className="icon"/>: <FaUser className="icon"/>}
                </div>
                <p className="game-genre">{genre? genre: "This game has no genre"}</p>
                <p className="game-description">{description? description: "This game has no description"}</p>
            </div>
        </div>
    )
}

export default GameCard