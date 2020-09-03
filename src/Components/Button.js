import React from "react"

import "../Styles/buttons.css"

function Button ({id, classes, text, func, type="submit"}) {
    return (
        <button 
        id={id}
        className={classes}
        type={type}
        onClick={func? () => func(): null}>
            {text}
        </button>
    )
}

export default Button