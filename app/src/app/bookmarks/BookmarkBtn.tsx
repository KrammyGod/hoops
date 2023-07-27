import { useState, useEffect, MouseEventHandler } from 'react';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { API } from '@/types/ApiRoute';

export const getBookmarks = async (page?: number) => {
    return fetch(`${API}/bookmarks/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const BookmarksBtn = ({
    pid,
    initialValue,
    fromBookmarksList=false,
    removeBookmarksList
}: {
    pid: number;
    initialValue?: boolean;
    fromBookmarksList?: boolean;
    removeBookmarksList?: () => void;
}) => {
    const [isMarked, mark] = useState(initialValue == undefined ? false : initialValue);

    useEffect(() => {
        if (!fromBookmarksList && initialValue == undefined) {
            fetch(`${API}/bookmarks/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pid })
            })
            .then((res) => res.json())
            .then((data) => data.data.length === 0 ? mark(false) : mark(true))
            .catch((err) => console.log(err));
        }

        if (fromBookmarksList) {
            mark(fromBookmarksList)
        }
    }, [pid, fromBookmarksList, initialValue]);
    
    const toggleMark: MouseEventHandler<SVGElement> = (e) => {
        // Prevent anything in the bg from triggering
        e.stopPropagation();
        e.preventDefault();

        // do this first for the client
        mark((s) => !s);

        if (!isMarked) {
            fetch(API + '/bookmarks/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pid })
            }).catch((err) => console.log(err))
            .then(
                () => { mark(true) },
                () => { mark(false) }
            );
        } else {
            fetch(`${API}/bookmarks/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pid })
            }).catch((err) => console.log(err))
            .then(
                () => { 
                    mark(false) 
                    if (fromBookmarksList && removeBookmarksList) removeBookmarksList()
                },
                () => { mark(true) }
            );
       }
    };

    return <h3 style={{margin: 0}}>{isMarked ? <BsBookmarkFill onClick={toggleMark}/> : <BsBookmark onClick={toggleMark}/>}</h3>;
}

export default BookmarksBtn;
