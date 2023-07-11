import { useState, useEffect } from "react";
import { Pagination, Table } from "react-bootstrap";
import BookmarkBtn, { getBookmarks } from "./BookmarkBtn";
import { AiOutlineLink } from "react-icons/ai";
import "./list.css";

//
// This component requires button to redirect to /bookmarks
// NOTE: See BookmarkListOffCanvas for advanced development
//
const BookmarkList = ({uid}: {uid: number}) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [page, setPage] = useState(0);

    const next = () => {
       
        getBookmarks(uid, page+1)
            .then((data) => setBookmarks(data.data))
        
        setPage(page + 1)
        console.log(bookmarks)
    }
    const prev = () => {
        if (page > 0) {
            setPage(page - 1)
        }
        getBookmarks(uid, page)
        .then((data) => setBookmarks(data.data))
    }

    useEffect(() => {
        getBookmarks(uid)
        .then(data => {
            setBookmarks(data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [uid]);

    const removeBookmark = (pid: number) => {
        const newBookmarks = bookmarks.filter((i) => i["pid"] !== pid);
        setBookmarks(newBookmarks);
    };

    return (
        <div className="listContainer">
            <h1 className="title">Bookmarks</h1>
            <div className="tableContainer">
                <Table>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks.map((bookmark) => (
                            <tr key={`${bookmark["firstname"]} ${bookmark["lastname"]}`}>
                                <td valign="middle">
                                    <a href={`/playerstats/${bookmark["pid"]}`}>
                                        {`${bookmark["firstname"]} ${bookmark["lastname"]}`}
                                        <AiOutlineLink color="blue" />
                                    </a>
                                </td>
                                <td align="right" valign="middle">
                                    <BookmarkBtn 
                                        pid={bookmark["pid"]} 
                                        uid={bookmark["uid"]} 
                                        fromBookmarksList={true}
                                        removeBookmarksList={()=>removeBookmark(bookmark["pid"])}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </Table>
                <Pagination >
                    <Pagination.Prev onClick={() => prev()} disabled={page == 0}/>
                    <p style={{ margin: "0 10px" }}>{page + 1}</p>
                    <Pagination.Next onClick={() => next()} disabled={bookmarks.length < 10}/>
                </Pagination>
            </div>
        </div>
    );
};

export default BookmarkList;
