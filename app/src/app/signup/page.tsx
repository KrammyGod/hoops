'use client'

import { useState } from "react"
import { InputGroup, Form, Button } from "react-bootstrap"
import { API } from "../config"
import "./styles.css"

export default () => {

    const handleSubmit = (event: any) => {
        const form = event.target;

        event.preventDefault();
        event.stopPropagation();

        fetch(API + "/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: form[1].value,
                password: form[2].value,
                username: form[0].value
            })
        })
        .then((res) => res.json())
        .then((data) => {
            // put these in cookies
        })
        .catch((err) => {
            console.log(err)
        })

        window.location.replace("/")
    }

    return (
        <div className="outerContainer">
            <Form className="subContainer" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            id="name"
                            name="name"
                            aria-label="Name"
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            id="email"
                            name="email"
                            aria-label="Email"
                            required
                        />
                    </InputGroup>
                </Form.Group>
        
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control 
                            type="password"
                            name="password"
                            id="password" 
                            aria-label="Password" 
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <div className="rowContainer">
                    <Button type="submit">Sign Up</Button>
                    <p className="space">or</p>
                    <Button href="/login" variant="secondary">Login</Button>
                </div>
            </Form>
        </div>
    )
}