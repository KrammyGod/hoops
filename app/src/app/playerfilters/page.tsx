'use client'

import { API } from '@/types/ApiRoute';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from '../page.module.css';
import Table from 'react-bootstrap/Table';
import Pagination from '@/components/pagination';

export default function PlayerFilter() {
    const router = useRouter();
    const [results, setResults] = useState<{ id: number, name: string, rebounds: number, assists: number, points: number, games: number, season: number }[]>([]);
    const [rebounds, setRebounds] = useState(-1)
    const [assists, setAssists] = useState(-1)
    const [points, setPoints] = useState(-1)
    const [games, setGames] = useState(-1)
    const [season, setSeason] = useState(-1)
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(1)

    useEffect(() => {
        fetch(`${API}/pages?optn=flpl&rebounds=${rebounds}&assists=${assists}&points=${points}&games=${games}&season=${season}`)
          .then(response => response.json())
          .then(data => setNumPages(data.data?.total ?? 1))
          .catch(() => setNumPages(1))
    }, [rebounds, assists, points, games, season]);

    useEffect(() => {
        fetch(`${API}/playerfilter?rebounds=${rebounds}&assists=${assists}&points=${points}&games=${games}&season=${season}&page=${page}`)
          .then(response => response.json())
          .then(data => setResults(data.data ?? []))
          .catch(() => setResults([]))
    }, [rebounds, assists, points, games, season, page]);

    const handleKeyDown = (event: any) => {
        const name = event.target.name
        const value = event.target.value.length == 0 ? -1 : event.target.value
        if (event.key === 'Enter') {
            setPage(1);
            switch (name) {
                case 'rebounds':
                    setRebounds(value);
                    break;
                case 'assists': 
                    setAssists(value);
                    break;
                case 'points': 
                    setPoints(value);
                    break;
                case 'games': 
                    setGames(value);
                    break;
                case 'season':
                    setSeason(value);
                    break;
            }
        }
	}

    const generateCols = () => {
        if (results.length === 0) return (<tr><td colSpan={7} align='center'>No data found.</td></tr>)
        return (
            <>
            {results.map((result, index) => (
                <tr style={{ cursor: 'pointer' }} key={index} onClick={() => router.push(`/playerstats/${result.id}`)}>
                    <td>{result.id}</td>
                    <td>{result.name}</td>
                    <td>{result.rebounds}</td>
                    <td>{result.assists}</td>
                    <td>{result.points}</td>
                    <td>{result.games}</td>
                    <td>{result.season}</td>
                </tr>
            ))}
            </>
        )
    }

    const blurHandler = (event : any) => {
        switch (event.target.name) {
            case 'rebounds':
                event.target.value = rebounds === -1 ? '' : rebounds;
                break;
            case 'assists': 
                event.target.value = assists === -1 ? '' : assists;
                break;
            case 'points': 
                event.target.value = points === -1 ? '' : points;
                break;
            case 'games': 
                event.target.value = games === -1 ? '' : games;
                break;
            case 'season':
                event.target.value = season === -1 ? '' : season;
                break;
        }
    };

    return (
        <div className={styles.settingsOuterContainer}>
            <div className={styles.settingsContainer}>
                <div className='d-flex justify-content-center mb-1'>
                    <input type='number' min='0' onBlur={blurHandler} name='rebounds' className='form-control m-3' style={{ width: '120px'}} onKeyDown={handleKeyDown} placeholder='Rebounds'></input>
                    <input type='number' min='0' onBlur={blurHandler} name='assists' className='form-control m-3' style={{ width: '120px'}} onKeyDown={handleKeyDown} placeholder='Assists'></input>
                    <input type='number' min='0' onBlur={blurHandler} name='points' className='form-control m-3' style={{ width: '120px'}} onKeyDown={handleKeyDown} placeholder='Points'></input>
                    <input type='number' min='0' onBlur={blurHandler} name='games' className='form-control m-3' style={{ width: '120px'}} onKeyDown={handleKeyDown} placeholder='Games'></input>
                    <input type='number' min='0' onBlur={blurHandler} name='season' className='form-control m-3' style={{ width: '120px'}} onKeyDown={handleKeyDown} placeholder='Season'></input>
                </div>

                <div className='card'>
                    <div className='card-body'>
                        <div>Fetches all players corresponding to values more than or equal to inputs</div>
                        <div> 1. Please enter a natural number for rebounds, assists, points and games</div>
                        <div> 2. Please enter an exact year for season</div>
                        <div> 3. Hit Enter after inputing number for each field</div>
                    </div>
                </div>

                <Table className='text-center mt-4' striped bordered hover variant='light'>
                    <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>Name</th>
                            <th>Rebounds</th>
                            <th>Assists</th>
                            <th>Points</th>
                            <th>Games</th>
                            <th>Season</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateCols()}
                    </tbody>
                </Table>

                <Pagination 
                    page={page}
                    numPages={numPages}
                    onPageChange={(page) => setPage(page)}
                />
            </div>
        </div>
    )
}
