import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Fadein from "react-fade-in"
import { Formik, Form, Field } from "formik";

import axios from "axios"
import baseUrl from "../fetch/url"

import Button from "../Button"

import icon from "../../Assets/logo.png"

function Session () {
    const history = useHistory()

    //Flag to change between Login/Register. true means login and false means register
    const [login, setLogin] = useState(true)

    function validateUserName (value) {
        let error
        if (!value) {
            error = "Required"
        } else if (value.length < 5) {
            error = "Must be 5 characters or more"
        }
        return error
    }

    function validatePassword (value) {
        let error
        if (!value) {
            error = "Required"
        } else if (value.length < 5) {
            error = "Must be 5 characters or more"
        }
        return error
    }

    return (
        <Fadein>
            <Formik
            initialValues={{username: "", password: ""}}
            onSubmit= {async (values, {setSubmitting}) => {
                try {
                    const response = login? await axios.post(baseUrl + "login", values): await axios.post(baseUrl + "register", values)
                    localStorage.setItem("id", response.data)
                    history.push("/")
                }catch(err) {
                    alert(err)
                }
            }}
            >
                {({ errors, touched }) => (
                    <Form id="login-container">
                        <img src={icon} alt="icon"></img>
                        <Field name="username" placeholder="Username" validate={validateUserName}/>
                        {errors.username && touched.username ? <div>{errors.username}</div>: null}
                        <Field type="password" name="password" placeholder="Password" validate={validatePassword}/>
                        {errors.password && touched.password ? <div>{errors.password}</div>: null}
                        <Button id="login-button" classes="button" text={login? "Login": "Register"}/>
                        <p className="cursor" onClick={() => setLogin(!login)}>{login? "Don't have an account?" : "Already have an account?"}</p>                
                    </Form>
                )}
            </Formik>
        </Fadein>
    )
}

export default Session