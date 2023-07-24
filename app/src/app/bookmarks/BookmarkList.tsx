import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import BookmarkBtn, { getBookmarks } from "./BookmarkBtn";
import { AiOutlineLink } from "react-icons/ai";
import "./list.css";
import Pagination from "@components/pagination";
import { API } from "@/types/ApiRoute";

//
// This component requires button to redirect to /bookmarks
// NOTE: See BookmarkListOffCanvas for advanced development
//

export default function BookmarkList() {
    const [bookmarks, setBookmarks] = useState([]);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState<number>(1);

    useEffect(() => {
        fetch(`${API}/pages?optn=bkmk`)
          .then(response => response.json())
          .then(data => setNumPages(data.data.total ?? 1))
          .catch(err => console.log(err))
    }, [bookmarks])

    useEffect(() => { 
        getBookmarks(page)
            .then((data) => setBookmarks(data.data))
            .catch((err) => console.log(err))
    }, [page])

    const removeBookmark = (pid: number) => {
        bookmarks.filter((i) => i["pid"] !== pid);
        getBookmarks(page)
            .then((data) => setBookmarks(data.data))
            .catch((err) => console.log(err))
    }

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
                                        fromBookmarksList={true}
                                        removeBookmarksList={()=>removeBookmark(bookmark["pid"])}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </Table>

                <Pagination 
                    page={page}
                    numPages={numPages}
                    onPageChange={(page) => setPage(page)}
                />
            </div>
        </div>
    );
}
