import React from "react"

function FormLine ({name, text=null, handleChange, values, placeholder=null}) {
    return (
        <div className="form-line">
            <label htmlFor={name}>{text}</label>
            <input
                id={name}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                value={values}
            />
        </div>
    )
}

export default FormLine