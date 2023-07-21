"use client"

import BookmarkList from "./BookmarkList";
import useSession from "@/hooks/Auth";

export default function BookmarksPage() {
    const { session } = useSession()
    return (
       <BookmarkList uid={session?.user.id ?? 0} />
    );
}