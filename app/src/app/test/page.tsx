"use client"
import BookmarkBtn from "../bookmarks/BookmarkBtn";
import BookmarkList from "../bookmarks/BookmarkList";
export default function TestPage() {
    return (
        <>
            <BookmarkList uid={1}></BookmarkList>
            <BookmarkBtn pid={5} uid={1}></BookmarkBtn>
        </>
    );
}