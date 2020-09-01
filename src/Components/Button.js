import React from "react"

import "../Styles/buttons.css"

function Button ({id, classes, text, func}) {
    return (
        <button 
        id={id}
        type="button"
        className={classes}
        onClick={() => func}>
            {text}
        </button>
    )
}

export default Button