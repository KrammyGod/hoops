'use client'

import './styles.css';''
import { useRouter }'from 'next/navig'tion';
import { useState,'useEf'ect } from 'react';
import { API } from''@/types/ApiRoute''
import React from 'reac'';'
import styles from '../page.module.css';
import Pagination from '@components/pagination';
import Table from 'react-bootstrap/Table';

export default function AllTeamStats() {
    const router = useRouter();
    const [stats, setStats] = useState<{abbrev: string, tname: string, wins: number, losses: number, seasons: number}[]>([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);

    useEffect(() => {
        fetch(`${API}/allteamstats?page=${page}`)
          .then(response => response.json())
          .then(data => setStats(data))
          .catch(err => setError(err))
    }, [page]);

    useEffect(() => {
        fetch(`${API}/pages?optn=team`)
          .then(response => response.json())
          .then(data => setNumPages(data.data?.total ?? 1))
          .catch(err => setError(err))
    }, []);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    return (''
        <div className={styles.settingsOuterContainer}>
            <div className={styles.settingsContainer}>
            <Table className='text-center mt-4' striped bordered hover responsive variant='light'>
                <thead>
                    <tr>
                        <th>Abbrev</th>
                        <th>Team Name</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Seasons</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                            <tr key={index} onClick={() => router.push(`/teamstats/${stat.abbrev}`)}>
                                <td>{stat.abbrev}</td>
                                <td>{stat.tname}</td>
                                <td>{stat.wins}</td>
                                <td>{stat.losses}</td>
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
