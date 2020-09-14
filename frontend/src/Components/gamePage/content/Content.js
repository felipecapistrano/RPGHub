import React, { useState } from "react"

import "./content.css"

function Content ({name, children}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="content-container">
            <div onClick={() => setOpen(!open)} className="content-header cursor">
                <i className={open? "arrow-down": "arrow-right"}></i>
                <h3>{name}</h3>
            </div>
            {open && <div className="content-children">
                {children}
            </div>}
        </div>
    )
}
export default Content