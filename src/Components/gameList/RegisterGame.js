import React from "react"
import { Formik, Form, Field } from "formik";

import Modal from "../Modal";

import axios from "axios"
import baseUrl from "../fetch/url"

import "../../Styles/form.css"

function RegisterGame ({close}) {
    return (
        <Formik
        initialValues={{name: ""}}
        onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
        }}>
            <Form className="container">
                <Modal onSubmit="" close={() => close()} title="Create game">
                    <div className="form-line">
                        <label htmlFor="name">Name</label>
                        <Field name="name"/>
                    </div>
                </Modal>
            </Form>
        </Formik>
    )
}

export default RegisterGame