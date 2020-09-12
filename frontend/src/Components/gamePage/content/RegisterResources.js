import React from "react"
import { Formik, Form, Field } from "formik";
import axios from "axios"
import { useHistory } from "react-router";

import Modal from "../../Modal";
import baseUrl from "../../fetch/url";

import "../../../Styles/form.css"

function RegisterResources ({close, url}) {
    const history = useHistory()

    function validateName (value) {
        let error
        if (!value) 
            error = "Required"
        else if (value.length > 30) 
            error = "Name must be shorter than 30 characters"
        return error
    }

    function validateValue (value) {
        let error
        // eslint-disable-next-line
        var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
        if (!value) 
            error = "Required"
        else if (!regex.exec(value)) 
            error = "Invalid URL"
        return error
    }


    return (
        <Formik
        initialValues={{
            game_id: url,
            name: "",
            value: ""
        }}
        onSubmit= {async (values) => {
            try {
                await axios.post(baseUrl + "games/addresource", values)
                history.go()
            }catch(err) {
                alert(err)
            }
        }}>
            {({ errors, touched }) => (
                <Form className="container">
                    <Modal close={() => close()} title="Add resource">
                        <div className="form-line">
                            <label htmlFor="name">Name</label>
                            <Field name="name" validate={validateName}/>
                        </div>
                        {errors.name && touched.name ? <div className="exception exception-modal">{errors.name}</div>: null}
                        <div className="form-line">
                            <label htmlFor="value">URL</label>
                            <Field name="value" validate={validateValue}/>
                        </div>
                        {errors.value && touched.value ? <div className="exception exception-modal">{errors.value}</div>: null}
                    </Modal>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterResources