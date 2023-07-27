import { useState } from 'react';
import { Button, Modal, Form, CloseButton } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { API } from '@/types/ApiRoute';
import Loading from '../loading';
import styles from '../page.module.css';

export default function DeleteUser() {
    const [validated, setValidated] = useState(false);
    const [attempted, setAttempted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event: any) => {
        setLoading(true);
        const form = new FormData(event.target);

        event.preventDefault();
        event.stopPropagation();

        fetch(API + '/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: form.get('pass')
            })
        })
        .then((res) => {
            if (res.status != 200) {
                setLoading(false);
                setValidated(false);
                setAttempted(true);
            } else {
                setLoading(false);
                setValidated(true);
                handleClose();
                signOut({ callbackUrl: '/' });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <Button style={{ width: '14vw', maxWidth: '120px' }} variant='danger' onClick={handleShow}>
                <h3 style={{ fontSize: '1.8rem' }}><FaTrash /></h3>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body className={styles.rowContainer} style={{ justifyContent: 'space-between' }}>
                    <p>Enter password to delete account.</p>
                    <CloseButton onClick={handleClose} />
                </Modal.Body>
                <div className={styles.settingsOuterContainer}>
                    <Form onSubmit={handleSubmit} validated={validated} className={styles.deleteModal}>
                        <Form.Group>
                            <Form.Control
                                id='pass'
                                name='pass'
                                aria-label='password'
                                required
                                isInvalid={!validated && attempted}
                                onChange={() => setAttempted(false)}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Invalid password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div style={{ marginTop: '1vh' }}>
                            {loading ? 
                                <Button disabled variant='outline-danger' type='submit'><Loading styled={false}/></Button> :
                                <Button variant='outline-danger' type='submit'>Confirm Delete</Button>
                            }
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
