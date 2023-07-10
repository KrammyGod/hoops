import { useState } from 'react';
import { Button, Modal, Form, CloseButton } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa"
import { API } from '../config';
import { useAuth } from "../auth"
import { useRouter } from "next/navigation"
import Loading from '../loading';
import styles from "../page.module.css"

export default () => {
    const router = useRouter()

    const [validated, setValidated] = useState(false);
    const [attempted, setAttempted] = useState(false);
    const [loading, setLoading] = useState(false)
    const { handleAuth, uid } = useAuth()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event: any) => {
        setLoading(true)
        const form = event.target;

        event.preventDefault();
        event.stopPropagation();

        fetch(API + "/users/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: uid,
                password: form[0].value
            })
        })
        .then((res) => {
            if (res.status == 400) {
                setLoading(false)
                setValidated(false)
                setAttempted(true)
            } else {
                setLoading(false)
                setValidated(true)
                handleAuth(false)
                handleClose()
                router.push("/login")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <Button style={{ width: "14vw", maxWidth: "120px" }} variant="danger" onClick={handleShow}>
                <h3 style={{ fontSize: "1.8rem" }}><FaTrash /></h3>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body className={styles.rowContainer} style={{ justifyContent: "space-between" }}>
                    <p>Enter password to delete account.</p>
                    <CloseButton onClick={handleClose} />
                </Modal.Body>
                <div className={styles.settingsOuterContainer}>
                    <Form onSubmit={handleSubmit} validated={validated} className={styles.deleteModal}>
                        <Form.Group>
                            <Form.Control
                                id="pass"
                                name="pass"
                                aria-label="password"
                                required
                                isInvalid={!validated && attempted}
                                onChange={() => setAttempted(false)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div style={{ marginTop: "1vh" }}>
                            {loading ? 
                                <Button disabled variant="outline-danger" type="submit"><Loading styled={false}/></Button> :
                                <Button variant="outline-danger" type="submit">Login</Button>
                            }
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}