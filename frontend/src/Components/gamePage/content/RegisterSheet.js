import React from "react"
import { Formik, Form, Field, FieldArray } from "formik";
import { useHistory } from "react-router";
import { AiFillDelete } from "react-icons/ai"
import { IconContext } from "react-icons";
import axios from "axios"

import Modal from "../../modals/Modal";
import baseUrl from "../../fetch/url";
import "../../../Styles/form.css"
import Button from "../../Button";
import useDataFetch from "../../fetch/useDataFetch";

function RegisterSheet ({close, url}) {
    const history = useHistory()
    const [{data, isLoading}] = useDataFetch(`games/sheet/${url}`)
    if (isLoading) return null
    console.log(data)
    return (
        <Formik
        initialValues={{
            game_id: url,
            fields: data
        }}
        onSubmit= {async (values) => {
            try {
                await axios.post(baseUrl + "games/savesheet", values)
                history.go()
            }catch(err) {
                alert(err)
            }
        }}>
            {({ values, errors, touched }) => (
                <Form className="container">
                    <Modal close={() => close()} title="Edit Sheet" className="resource-modal">
                        <FieldArray name="fields">
                            {({ insert, remove, push }) => (
                                <IconContext.Provider value={{ size: "2em"}}>
                                    {values.fields.length > 0 && values.fields.map((field, index) => (
                                        <div key={index} className="form-line">
                                            <label htmlFor={`fields.${index}.name`}>Field</label>
                                            <Field style={{width: "60%", margin: "10px"}} name={`fields.${index}.name`}/>
                                            <label htmlFor={`fields.${index}.type`}>Type</label>
                                            <Field style={{width: "20%", margin: "10px"}} name={`fields.${index}.type`} as="select">
                                                <option value="input">Text</option>
                                                <option value="textarea">Textarea</option>
                                            </Field>
                                            <AiFillDelete style={{alignSelf: "center"}} className="cursor" onClick={() => remove(index)}/>
                                        </div>
                                    ))}
                                    <Button 
                                    type="button" 
                                    classes="button margin" 
                                    text="Add field" 
                                    func={() => push({ name: "", type: "input"})}
                                    />
                                </IconContext.Provider>
                            )}
                        </FieldArray>
                    </Modal>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterSheet