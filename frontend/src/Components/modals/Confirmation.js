import React from "react"
import Fadein from "react-fade-in"

import Button from "../Button"

import "./modal.css"

function Confirmation ({title, close, text, func, className}) {
    return (
        <div className="container">
            <Fadein className={`confirmation ${className}`}>
                <header id="confirmation-header">
                    <h1>{title}</h1>
                    <p onClick={() => close()} className="cursor">X</p>                
                </header>
                <div id="modal-children">
                    <p>{text}</p>
                </div>
                <footer id="confirmation-footer">
                    <Button type="button" func={() => close()} classes="button" text="Cancel"/>
                    <Button type="button" func={() => func()} classes="button" text="Confirm"/>
                </footer>
            </Fadein>
        </div>
    )
}

export default Confirmation