import { useState, useEffect } from 'react'
import { Button, Table, Offcanvas } from 'react-bootstrap'
import BookmarkBtn from './BookmarkBtn';
import { API } from '@/types/ApiRoute';

//
// This component is temporarily disabled until further development
// REASON: When bookmarks are removed from the canvas, then any BookmarkBtn 
//         on the underlying page are not updated.
//
const BookmarkListOffCanvas = ({uid}: {uid: number}) => {
    const [isOpen, open] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const handleClose = () => open(false);
    const toggleShow = () => open((s) => !s);

    useEffect(() => {
        fetch(API + '/bookmarks/show', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uid})
        })
        .then((res) => res.json())
        .then(data => {
            setBookmarks(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [uid, isOpen])

    return (
        <>
            <Button variant='primary' onClick={toggleShow}>
                Bookmarks
            </Button>
            <Offcanvas show={isOpen} onHide={handleClose} scroll={true} backdrop={false}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Bookmarks</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(bookmarks) ? bookmarks.map((bookmark) => (
                            <tr key={`${bookmark['firstname']} ${bookmark['lastname']}`}>
                                <td>{`${bookmark['firstname']} ${bookmark['lastname']}`}</td>
                                <td align='right'>
                                    <BookmarkBtn pid={bookmark['pid']} fromBookmarksList={true}/>
                                </td>
                            </tr>
                        )) : <></>}
                    </tbody>
                </Table>
            </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default BookmarkListOffCanvas;
