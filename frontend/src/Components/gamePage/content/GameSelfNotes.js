import React, { useEffect, useState } from "react"
import { Formik, Form, Field } from "formik"
import { useHistory } from "react-router";
import axios from "axios"

import Content from "./Content"
import baseUrl from "../../fetch/url"
import Button from "../../Button"

function GameSelfNotes ({url}) {
    const [notes, setNotes] = useState("")
    const user_id = localStorage.getItem("id")
    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post(baseUrl + `games/getnotes`, {user_id: user_id, game_id: url})
                setNotes(result.data)
            }catch(error) {
                alert(error)
            }
        }
        fetchData()
    })

    return (
        <Content name="Self-Notes">
            <Formik
            initialValues={{
                text: notes || "",
                game_id: url,
                user_id: user_id
                }}
            onSubmit= {async (values) => {
                try {
                    await axios.post(baseUrl + `games/savenotes`, values)
                    history.go()
                }catch(err) {
                    alert(err)
                }
            }}
            >
                <Form>
                    <p>Only you can see these notes.</p>
                    <Field as="textarea" name="text" className="text-area"/>
                    <Button type="submit" classes="button end" text="Save"/>
                </Form>
            </Formik>
        </Content>
    )
}

export default GameSelfNotes