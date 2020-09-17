import React, { useEffect, useState } from "react"
import axios from "axios"
import { Field, FieldArray, Form, Formik } from "formik"
import { useHistory } from "react-router"

import Content from "../Content"
import baseUrl from "../../../fetch/url"
import Button from "../../../Button"
import CharacterCard from "./CharacterCard"

function GameCharacter ({url}) {
    const user_id = localStorage.getItem("id")
    const history = useHistory()
    const [character, setCharacter] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post(baseUrl + `games/getcharacter`, {user_id: user_id, game_id: url})
                setCharacter(result.data)
            }catch(error) {
                alert(error)
            }
        }
        fetchData()
    }, [url, user_id])
    
    if (!character) return null
    return (
        <Content name="Character">
            <Formik
            initialValues={{
                game_id: url,
                user_id: user_id,
                name: character.name,
                image: character.image,
                fields: character.fields
            }}
            onSubmit= {async (values) => {
                try {
                    await axios.post(baseUrl + "games/savecharacter", values)
                    history.go()
                }catch(err) {
                    alert(err)
                }
            }}>
                {({ values, errors, touched }) => (
                    <Form>
                        <FieldArray name="fields">
                            <>
                                <div className="form-line">
                                    <label htmlFor={values.name}>Name</label>
                                    <Field className="content-input" style={{width: "70%", margin: "10px"}} name="name"/>
                                </div>
                                <div className="form-line">
                                    <label htmlFor={values.name}>Image</label>
                                    <Field className="content-input" style={{width: "70%", margin: "10px"}} name="image"/>
                                </div>
                                <div style={{display:"flex", justifyContent: "center"}}>
                                    <CharacterCard name={values.name} image={values.image}/>
                                </div>
                                
                                {values.fields.length > 0 && values.fields.map((field, index) => (
                                    <div key={index} className="form-line">
                                        <label htmlFor={`fields.${index}.value`}>{field.name}</label>
                                        <Field className={`content-${field.type}`} as={field.type} style={{width: "70%", margin: "10px"}} name={`fields.${index}.value`}/>
                                    </div>
                                ))}
                            </>
                        </FieldArray>
                        <Button type="submit" classes="button end" text="Save"/>
                    </Form>
                )}
            </Formik>
        </Content>
    )
}

export default GameCharacter