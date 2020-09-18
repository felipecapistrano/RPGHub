import React, { useEffect, useState } from "react"
import axios from "axios"
import { Field, FieldArray, Form, Formik } from "formik"
import { useHistory } from "react-router"
import { IoMdAddCircle } from "react-icons/io"

import Content from "../Content"
import baseUrl from "../../../fetch/url"
import Button from "../../../Button"
import CharacterCard from "./CharacterCard"
import useDataFetch from "../../../fetch/useDataFetch"

function GameNpcs ({url}) {
    const history = useHistory()
    const [{data, isLoading}] = useDataFetch(`games/sheet/${url}`)
    const [npcs, setNpcs] = useState([{game_id: url, id:"", name: "", image: "", fields: [] || []}])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post(baseUrl + `games/getnpcs`, {game_id: url})
                if (result.data.length !== 0)
                    setNpcs(result.data)
                else
                    setNpcs([{game_id: url, id:"", name: "", image: "", fields: data}])
            }catch(error) {
                alert(error)
            }
        }
        fetchData()
    }, [url, data])

    if (isLoading) return null
    const fields = data? (data.map((field) => {
        return {name: field.name, type: field.type, sheet_id: field.sheet_id, value: ""}
    })): null

    return (
        <Content name="Npcs">
            <Formik
            initialValues={{
                game_id: url,
                id: "",
                name: "",
                image: "",
                fields: fields || []
            }}
            onSubmit= {async (values) => {
                try {
                    await axios.post(baseUrl + "games/savenpc", values)
                    history.go()
                }catch(err) {
                    alert(err)
                }
            }}>
                {({ values, setValues, errors, touched }) => (
                    <Form>
                        <FieldArray name="fields">
                            <>
                                {npcs.map((npc) => {
                                    return (
                                        <div key={npc.name} style={{marginBottom:"10px", justifyContent:"flex-start"}} className="form-line">
                                            <p style={{marginRight: "10px"}} className="cursor bold" onClick={() => setValues(npc)}>{npc.name}</p>
                                            {values.id === npc.id? <p>{"<--"}</p>:null}
                                        </div>
                                    )
                                })}
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
                        <div onClick={() => setValues({game_id: url, id:"", name: "", image: "", fields: fields || []})} className="add-button cursor">
                            <IoMdAddCircle/>
                        </div>
                    </Form>
                )}
            </Formik>
        </Content>
    )
}

export default GameNpcs