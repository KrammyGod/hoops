import { useState, useEffect } from "react"
import { Table } from "react-bootstrap"
import BookmarkBtn from "./BookmarkBtn";
import { API } from "@/app/config";
import "./list.css"

//
// This component requires button to redirect to /bookmarks
// NOTE: See BookmarkListOffCanvas for advanced development
//
export default ({uid}: {uid: number}) => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        fetch(API + "/bookmarks/show", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
    }, [])

    const removeBookmark = (pid: number) => {
        const newBookmarks = bookmarks.filter((i) => i["pid"] !== pid)
        setBookmarks(newBookmarks)
    }

    return (
        <div className="container">
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
                                    <a href={`/player/${bookmark["pid"]}`}>
                                        {`${bookmark["firstname"]} ${bookmark["lastname"]}`}
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
            </div>
        </div>
    );
}
