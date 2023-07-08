'use client'

import { useState } from "react"
import { InputGroup, Form, Button } from "react-bootstrap"
import { API } from "../config"
import "./styles.css"

export default () => {
    const [validated, setValidated] = useState(true);
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = (event: any) => {
        const form = event.target;

        event.preventDefault();
        event.stopPropagation();
        
        fetch(API + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: form[0].value,
                password: form[1].value,
            })
        })
        .then((res) => res.json())
        .then(({ data }) => {
            // put these in cookies
            if (data["success"]) {
                window.location.replace("/")
                setValidated(true)
            } else {
                console.log(data["success"])
                setValidated(false)
            }
        })
        .catch((err) => {
            console.log(err)
        })

        
    }

    return (
        <div className="outerContainer">
            <Form noValidate className="subContainer" validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3" hasValidation>
                        <Form.Control
                            id="email"
                            name="email"
                            aria-label="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!validated}
                        />
                        <Form.Control.Feedback type="invalid">
                            Invalid email/password.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
        
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3" hasValidation>
                        <Form.Control 
                            type="password"
                            name="password"
                            id="password" 
                            aria-label="Password" 
                            required
                            onChange={(e) => setPass(e.target.value)}
                            isInvalid={validated}
                            isValid={validated || pass.length == 0}
                        />
                        <Form.Control.Feedback type="invalid">
                            Invalid email/password.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <div className="rowContainer">
                    <Button type="submit">Login</Button>
                    <p className="space">or</p>
                    <Button href="/signup" variant="secondary">Sign Up</Button>
                </div>
            </Form>
        </div>
    )
}