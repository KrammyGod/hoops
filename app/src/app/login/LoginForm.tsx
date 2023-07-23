import './styles.css';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import Loading from '../loading';

export default function LoginForm({ children, params }: { children?: React.ReactNode, params : any }): React.ReactNode {
    const isInvalid = !!params?.error;
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
            callbackUrl: params?.callbackUrl ?? '/'
        });
    }

    return (
        <div className="outerContainer">
            <div className="subContainer">
                {children}
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="mb-3" hasValidation>
                            <Form.Control
                                id="email"
                                name="email"
                                aria-label="Email"
                                required
                                onChange={(e) => setAttempted(true)}
                                isInvalid={isInvalid && !attempted}
                            />
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
                                onChange={(e) => setAttempted(true)}
                                isInvalid={isInvalid && !attempted}
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid email/password.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <div className="rowContainer">
                        {loading ? 
                            <Button disabled type="submit"><Loading styled={false}/></Button> :
                            <Button type="submit">Login</Button>
                        }
                        <p className="space">or</p>
                        <Button href="/signup" variant="secondary">Sign Up</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
