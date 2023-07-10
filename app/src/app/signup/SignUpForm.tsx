'use client'

import { InputGroup, Form  } from "react-bootstrap"

export default ({
    btns = <div></div>,
    submit=(event: any)=>{},
    values={name: undefined, email: undefined}
}) => {
    return (
        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        id="name"
                        name="name"
                        aria-label="Name"
                        required
                        defaultValue={values.name}
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
                        defaultValue={values.email}
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
            {btns}
        </Form>
    )
}