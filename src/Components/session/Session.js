import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Fadein from "react-fade-in"
import { useFormik } from "formik"

import axios from "axios"
import baseUrl from "../fetch/url"

import Button from "../Button"

import icon from "../../Assets/logo.png"

function Session () {
    const history = useHistory()

    //Flag to change between Login/Register. true means login and false means register
    const [login, setLogin] = useState(true)

    const validate = values => {
        const errors = {}
        if (!values.userName) {
            errors.userName = "Required"
        } else if (values.userName.length < 5) {
            errors.userName = "Must be 5 characters or more"
        }

        if (!values.password) {
            errors.password = "Required"
        } else if (values.password.length < 5) {
            errors.password = "Must be 5 characters or more"
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validate,
        onSubmit: async values => {
            try {
                const endpoint = login? "/login": "/register"
                const response = await axios.post(baseUrl + endpoint, values)
                localStorage.setItem("id", response.data.id)
                history.push("/")
            }catch(err) {
                alert(err)
            }
        }
    })

    return (
        <Fadein>
            <form id="login-container" onSubmit={formik.handleSubmit}>
                <img src={icon} alt="icon"></img>
                <input
                    id="userName"
                    name="userName"
                    placeholder="UserName"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                />
                {formik.errors.userName ? <div>{formik.errors.userName}</div>: null}
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div>{formik.errors.password}</div>: null}
                <Button id="login-button" classes="button" text={login? "Login": "Register"}/>
                <p className="cursor" onClick={() => setLogin(!login)}>{login? "Don't have an account?" : "Already have an account?"}</p>                
            </form>
        </Fadein>
    )
}

export default Session