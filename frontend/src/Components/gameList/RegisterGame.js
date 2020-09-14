import React from "react"
import { Formik, Form, Field } from "formik";
import axios from "axios"
import { useHistory } from "react-router";

import Modal from "../modals/Modal";
import baseUrl from "../fetch/url";

import "../../Styles/form.css"

function RegisterGame ({close}) {
    const history = useHistory()

    function validateName (value) {
        let error
        if (!value) 
            error = "Required"
        else if (value.length > 30) 
            error = "Name must be shorter than 30 characters"
        return error
    }

    function validateGenre (value) {
        let error
        if (value.length > 30) 
            error = "Genre must be shorter than 30 characters"
        return error
    }

    function validateDescription (value) {
        let error
        if (value.length > 150) 
            error = "Description must be shorter than 150 characters"
        return error
    }

    return (
        <Formik
        initialValues={{
            gamename: "", 
            genre: "",
            image: "", 
            description: "", 
            owner_id: localStorage.getItem("id")}}
        onSubmit= {async (values) => {
            try {
                await axios.post(baseUrl + "games/create", values)
                history.go()
            }catch(err) {
                alert(err)
            }
        }}>
            {({ errors, touched }) => (
                <Form className="container">
                    <Modal close={() => close()} title="Create game" className="gamelist-modal">
                        <div className="form-line">
                            <label htmlFor="gamename">Name</label>
                            <Field name="gamename" validate={validateName}/>
                        </div>
                        {errors.gamename && touched.gamename ? <div className="exception exception-modal">{errors.gamename}</div>: null}
                        <div className="form-line">
                            <label htmlFor="genre">Genre</label>
                            <Field name="genre" validate={validateGenre}/>
                        </div>
                        {errors.genre && touched.genre ? <div className="exception exception-modal">{errors.genre}</div>: null}
                        <div className="form-line">
                            <label htmlFor="image">Image URL</label>
                            <Field name="image"/>
                        </div>
                        <div className="form-line">
                            <label htmlFor="description">Description</label>
                            <Field name="description" validate={validateDescription}/>
                        </div>
                        {errors.description && touched.description ? <div className="exception exception-modal">{errors.description}</div>: null}
                    </Modal>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterGame