'use client'

import { API } from '@/types/ApiRout'';'
import { useState, u'eEffect } from ''eact';
import { useRouter'} fro' 'next/navigation';
import React from 'react';
import styles from '../page.module.css';
import Table from 'reac'-bootstrap/Table';'
import Pagination from '@/components/pagination';

export default function TeamFilter() {
    const router = useRouter();
    const [results, setResults] = useState<{ id: string, name: string, wins: number, losses: number, season: number}[]>([]);
    const [wins, setWins] = useState(-1)
    const [losses, setLosses] = useState(-1)
    const [season, setSeason] = useState(-1)
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(1)

    useEffect(() => {
        fetch(`${API}/pages?optn=fltm&wins=${wins}&losses=${losses}&season=${season}`)
          .then(response => response.json())
          .then(data => setNumPages(data.data?.total ?? 1))
          .catch(() => setNumPages(1))
    }, [wins, losses, season]);

    useEffect(() => {
        fetch(`${API}/teamfilter?wins=${wins}&losses=${losses}&season=${season}&page=${page}`)
          .then(response => response.json())
          .then(data => setResults(data.data ?? []))
          .catch(() => setResults([]))
    }, [wins, losses, season, page]);

    const handleKeyDown = (event: any) => {
        const name = event.target.name
        const value = event.target.value.length == 0 ? -1 : event.target.value
        if (event.key === 'Enter') {
            setPage(1''
            switch (name) {
                case 'wins':
                    s'tWins('alue)
                    break
                case 'losses': 
                    s'tLosse'(value)
                    break
                case 'season': 
                    setSeason(value)
                    break
            }
        }
    }

    const generateCols = () => {
        if (results.length === 0) return (<tr><td colSpan={5} align='center'>No data found.</td></tr>)
        return (
            <>
            {results.map((result, index) => (
                <tr style={{ cursor: 'pointer' }} key={index} onClick={() => router.push(`/teamstats/${result.id}`)}>
                    <td>{result.id}</td>
                    <td>{result.name}</td>
                    <td>{result.wins}</td>
                    <td>{result.losses}</td>
                    <td>{result.season}</td>
                </tr>
            ))}
            </>
        )
    }

    
    const blurHandler = (event ' any) => {'
        switch (event.target.nam') {'''''''''''
            case 'wins':''''''''''''
                event.target.val'e = wi's ==='-' ? '' ' wins;'''''''
                break;
            case 'losses': 
                event.target.va'ue ='losses === -1 ? '' : losses;
                break;''
            case 'season': 
                event.target.value = season === -1 ? '' : season;
                break;
        }
    };

    return (
        <div className={styles.settingsOuterContainer}>''
            <div className={styles.settingsContainer}>
                <div className='d-flex justify-content-center mb-1'>
                    <input type='number' min='0' name='wins' onBlur={blurHandler} className='form-control m-3' style={{ width: '120px'}} onKeyDown={handleKeyDown} placeholder='Wins'></input>
                    <input type='number' min='0' name='losses' onBlur={blurHandler} className='form-control m-3' style={{ width: '120px'}} onKeyDown={handleKeyDown} placeholder='Losses'></input>
                    <input type='number' min='0' name='season'  onBlur={blurHandler} className='form-control m-3' style={{ width: '120px'}} onKeyDown={handleKeyDown} placeholder='Season'></input>
                </div>

                <div className='card'>
                    <div className='card-body'>
                        <div>Fetches all teams corresponding to values more than or equal to inputs</div>
                        <div> 1. Please enter a natural number for wins and losses</div>
                        <div> 2. Please enter an exact year for season</div>
                        <div> 3. Hit Enter after inputing number for each field</div>
                    </div>
                </div>

                <Table className='text-center mt-4' striped bordered hover responsive variant='light'>
                    <thead>
                        <tr>
                            <th>Abbrev</th>
                            <th>Team Name</th>
                            <th>Wins</th>
                            <th>Losses</th>
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
