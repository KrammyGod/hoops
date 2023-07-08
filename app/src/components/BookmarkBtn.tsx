import { useState, useEffect } from "react"
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { API } from "@/app/config";

export default ({
    pid, 
    uid, 
    fromBookmarksList=false,
    removeBookmarksList
}: {pid: number; uid: number; fromBookmarksList?: boolean; removeBookmarksList?: () => void}) => {
    const [isMarked, mark] = useState(fromBookmarksList ? true : false);
    
    if (!fromBookmarksList) {
        useEffect(() => {
            fetch(API + "/bookmarks/get", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({pid, uid})
            })
            .then((res) => res.json())
            .then((data) => data.data.length === 0 ? mark(false) : mark(true))
            .catch((err) => console.log(err))
        }, [pid])
    }

    const toggleMark = () => {
        // do this first for the client
        mark((s) => !s)

        if (!isMarked) {
            fetch(API + "/bookmarks/create", {
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
            fetch(API + "/bookmarks/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({pid, uid})
            }).catch((err) => console.log(err))
            .then(
                () => { 
                    mark(false) 
                    if (fromBookmarksList && removeBookmarksList) removeBookmarksList()
                },
                () => { mark(true) }
            )
       }
    };

    return <h3 style={{margin: 0}}>{isMarked ? <BsBookmarkFill onClick={toggleMark}/> : <BsBookmark onClick={toggleMark}/>}</h3>
}
