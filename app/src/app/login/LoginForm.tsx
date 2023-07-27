import './styles.css';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { InputGroup, Form, Button } from 'react-bootstrap';
import Loading from '../loading';

type Params = { children?: React.ReactNode, params : ReadonlyURLSearchParams | null };

export default function LoginForm({ children, params }: Params): React.ReactNode {
    const isInvalid = !!params?.get('error');
    const [attempted, setAttempted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: any) => {
        setLoading(true);
        const form = event.target;

        event.preventDefault();
        event.stopPropagation();

        signIn('credentials', {
            email: form[0].value,
            password: form[1].value,
            // Allows the callback to propogate to the correct page
            callbackUrl: params?.get('callbackUrl') ?? '/'
        });
    }

    return (
        <div className='outerContainer'>
            <div className='subContainer'>
                {children}
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className='mb-3' hasValidation>
                            <Form.Control
                                id='email'
                                name='email'
                                aria-label='Email'
                                required
                                onChange={() => setAttempted(true)}
                                isInvalid={isInvalid && !attempted}
                            />
                        </InputGroup>
                    </Form.Group>
            
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <InputGroup className='mb-3' hasValidation>
                            <Form.Control 
                                type='password'
                                name='password'
                                id='password' 
                                aria-label='Password' 
                                required
                                onChange={() => setAttempted(true)}
                                isInvalid={isInvalid && !attempted}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Invalid email/password.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <div className='rowContainer'>
                        {loading ? 
                            <Button disabled type='submit'><Loading styled={false}/></Button> :
                            <Button type='submit'>Login</Button>
                        }
                        <p className='space'>or</p>
                        <Button href='/signup' variant='secondary'>Sign Up</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
