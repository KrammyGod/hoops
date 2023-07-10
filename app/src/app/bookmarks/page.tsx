"use client"

import BookmarkList from "./BookmarkList";
import { useAuth } from "../auth";

export default function BookmarksPage() {
    const { uid } = useAuth()
    return (
       <BookmarkList uid={uid} />
    );
}