import React from "react"

import Button from "./Button"

import "../Styles/modal.css"

function Modal ({ title, close, children}) {
    return (
            <div id="modal">
                <header id="modal-header">
                    <h1>{title}</h1>
                    <p onClick={() => close()} className="cursor">X</p>                
                </header>
                <div id="modal-children">
                    {children}
                </div>
                <footer id="modal-footer">
                    <Button type="button" func={() => close()} classes="button modal-button" text="Close"/>
                    <Button type="submit" classes="button modal-button" text="Create"/>
                </footer>
            </div>
    )
}

export default Modal