import { useState } from "react"
import { Button } from "react-bootstrap"
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { API } from "@/app/config";

export default ({pid, uid}: {pid: number; uid: number}) => {
    const [isMarked, mark] = useState(false);

    const toggleMark = () => {
        // do this first for the client
        mark((s) => !s)

        if (!isMarked) {
            fetch(API + "/bookmarks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({pid, uid})
            }).catch((err) => console.log(err))
            .then(
                () => { mark(true) },
                () => { mark(false) }
            )
        } else {
            fetch(API + "/bookmarks", {
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
