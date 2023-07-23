'use client'

import BookmarkList from './BookmarkList';
import useSession from '@hooks/Auth';
import useProtect from '@hooks/Protected';

function BookmarksPage() {
    const { session } = useSession()
    return (
       <BookmarkList />
    );
}

export default function ProtectedBookmarksPage() {
    return useProtect(<BookmarksPage />);
}
