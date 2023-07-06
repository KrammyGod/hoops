import { useState } from "react"
import { Button, Table, Offcanvas } from "react-bootstrap"

export default () => {
    const [isOpen, open] = useState(false);
    const handleClose = () => open(false);
    const toggleShow = () => open((s) => !s);

    return (
        <>
            <Button variant="secondary" onClick={toggleShow}>
                Bookmarks
            </Button>
            <Offcanvas show={isOpen} onHide={handleClose} scroll={true} backdrop={false}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
