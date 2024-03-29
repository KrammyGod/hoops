'use client'

import { API } from '@/types/ApiRoute';
import { useSession } from '@/hooks/SessionProvider';
import { useState, useEffect } from 'react';
import React from 'react';
import Table from 'react-bootstrap/Table';
import styles from '../../page.module.css';
import BookmarkBtn from '@/app/bookmarks/BookmarkBtn';

export default function PlayerStats({ params }: {
    params: { pid: string } 
}) {    
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [playerStats, setPlayerStats] = useState<{assists: number, points: number, rebounds: number, games: number, season: number, abbrev: string, tname: string}[]>([]);
    const [error, setError] = useState(null);
    const { session } = useSession();

    useEffect(() => {
        fetch(`${API}/playerstats/${params.pid}`)
          .then(response => response.json())
          .then(data => {
            setPlayerStats(data.stats);
            setFirstName(data.player.firstname);
            setLastName(data.player.lastname);
          })
          .catch(error => setError(error));
    }, [params.pid]);

    if (error) {
        return (
            <div className={styles.settingsOuterContainer}>
                <div>No player with pid {params.pid} exists</div>
            </div>
        )
    }

    return (
        <div className={styles.settingsOuterContainer}>
            <div className={`${styles.rowContainer} ${styles.settingsContainer}`} style={{ justifyContent: 'space-between' }}>
                <h3>{params.pid} {firstName} {lastName}</h3>
                {session ? <BookmarkBtn pid={Number(params.pid)} /> : <></>}
            </div>
            <Table className={`text-center mt-4 ${styles.settingsContainer}`} striped bordered responsive variant='light'>
                <thead>
                    <tr>
                        <th>Assists</th>
                        <th>Points</th>
                        <th>Rebounds</th>
                        <th>Games</th>
                        <th>Season</th>
                        <th>Abbrev</th>
                        <th>Team Name</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.assists}</td>
                                <td>{stat.points}</td>
                                <td>{stat.rebounds}</td>
                                <td>{stat.games}</td>
                                <td>{stat.season}</td>
                                <td>{stat.abbrev}</td>
                                <td>{stat.tname}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
}
