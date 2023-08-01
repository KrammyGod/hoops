'use client'

import BookmarkList from './BookmarkList';
import Protect from '@hooks/Protected';

export default function BookmarksPage() {
    return Protect(<BookmarkList />);
}
