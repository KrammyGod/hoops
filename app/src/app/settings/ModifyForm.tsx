'use client'

import { Button, InputGroup, Form } from 'react-bootstrap';

export default function Modify({
    submit=(event: any)=>{},
    values={ name: '', email: '' }
}) {
    return (
        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control
                        id='name'
                        name='name'
                        aria-label='Name'
                        required
                        defaultValue={values.name}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control
                        id='email'
                        name='email'
                        aria-label='Email'
                        required
                        defaultValue={values.email}
                    />
                </InputGroup>
            </Form.Group>
    
            <Form.Group>
                <Form.Label>Old Password</Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control 
                        type='password'
                        name='old_password'
                        id='old_password' 
                        aria-label='Old Password' 
                        required
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group>
                <Form.Label>New Password</Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control 
                        type='password'
                        name='new_password'
                        id='new_password' 
                        aria-label='New Password'
                    />
                </InputGroup>
            </Form.Group>
            <Button type='submit'>Change</Button>
        </Form>
    );
}
