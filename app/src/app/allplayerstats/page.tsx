'use client'

import './styles.css';
import { API } from '@/types/ApiRoute';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/SessionProvider';
import { AiOutlineLink } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import BookmarksBtn, { getBookmarks } from '../bookmarks/BookmarkBtn';
import styles from '../page.module.css';
import React from 'react';
import Pagination from '@components/pagination';
import Table from 'react-bootstrap/Table';

export default function AllPlayerStats() {
    const router = useRouter();
    const { session } = useSession();
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const [stats, setStats] = useState<{pid: number, name: string, asts: number, trbs: number, pts: number, games: number, seasons: number}[]>([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);

    useEffect(() => {
        fetch(`${API}/allplayerstats?page=${page}`)
          .then(response => response.json())
          .then(data => setStats(data))
          .catch(err => setError(err));

        if (session) {
            getBookmarks()
                .then((data) => {
                    setBookmarks(data.data?.map((marked: any) => marked['pid']) ?? [])
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        fetch(`${API}/pages?optn=plyr`)
          .then(response => response.json())
          .then(data => setNumPages(data.data?.total ?? 1))
          .catch(err => setError(err))
    }, []);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    return (
        <div className={styles.settingsOuterContainer}>
            <div className={styles.settingsContainer}>
            <Table className='text-center mt-4' striped bordered hover responsive variant='light'>
                <thead>
                    <tr>
                        <th>Player ID</th>
                        <th>Player Name</th>
                        <th>Assists</th>
                        <th>Rebounds</th>
                        <th>Points</th>
                        <th>Games</th>
                        <th>Seasons</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                            <tr key={index} onClick={() => router.push(`/playerstats/${stat.pid}`)}>
                                <td>{stat.pid}</td>
                                <td>
                                    <div className={styles.rowContainer} style={{ justifyContent: 'space-between' }}>
                                        <div>
                                            {stat.name}
                                            <AiOutlineLink color='blue' />
                                        </div>
                                        {session ? <BookmarksBtn pid={stat.pid} initialValue={bookmarks.includes(stat.pid)} /> : ''}
                                    </div>
                                </td>
                                <td>{stat.asts}</td>
                                <td>{stat.trbs}</td>
                                <td>{stat.pts}</td>
                                <td>{stat.games}</td>
                                <td>{stat.seasons}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Pagination 
                page={page}
                numPages={numPages}
                onPageChange={handlePageChange}
            />
            </div>
        </div>
    );
}
