import { useState } from "react"
import { Button } from "react-bootstrap"
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { api } from "@/app/config";

export default ({pid, uid}: {pid: number; uid: number}) => {
    const [isMarked, mark] = useState(false);
    console.log(api)

    const toggleMark = () => {
        // do this first for the client
        mark((s) => !s)

        if (isMarked) {
            fetch("http://localhost:5000/bookmarks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({pid, uid})
            }).catch((err) => console.log(err))
            .then(
                () => { mark(true); console.log("success") },
                () => { mark(false); console.log("failed") }
            )
        } else {
            fetch("http://localhost:5000/bookmarks", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({pid, uid})
            }).catch((err) => console.log(err))
            .then(
                () => { mark(false) },
                () => { mark(true) }
            )
        }
    };

    return <h3>{isMarked ? <BsBookmarkFill onClick={toggleMark}/> : <BsBookmark onClick={toggleMark}/>}</h3>
}
