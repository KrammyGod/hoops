"use client"

import { useState, useEffect } from "react";
import { API } from "@/types/ApiRoute";
import React from "react";
import styles from '../page.module.css';
import Table from 'react-bootstrap/Table';

export default function TeamFilter() {
    const [results, setResults] = useState<{ id: string, name: string, wins: number, losses: number, season: number}[]>([]);
    const [wins, setWins] = useState(-1)
    const [losses, setLosses] = useState(-1)
    const [season, setSeason] = useState(-1)

    useEffect(() => {
        fetch(`${API}/teamfilter?wins=${wins}&losses=${losses}&season=${season}`)
          .then(response => response.json())
          .then(data => setResults(data.data ?? []))
          .catch(error => setResults([]))
    }, [wins, losses, season]);

    const handleKeyDown = (event: any) => {
        const name = event.target.name
        const value = event.target.value.length == 0 ? -1 : event.target.value
        if (event.key === 'Enter') {
            switch (name) {
                case "wins":
                    setWins(value)
                    break
                case "losses": 
                    setLosses(value)
                    break
                case "season": 
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
                <tr key={index}>
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

    return (
        <div className={styles.settingsOuterContainer}>
            <div className={styles.settingsContainer}>
                <div className="d-flex justify-content-center mb-1">
                    <input type="number" min="0" name="wins" className="form-control m-3" style={{ width: "120px"}} onKeyDown={handleKeyDown} placeholder="Wins"></input>
                    <input type="number" min="0" name="losses" className="form-control m-3" style={{ width: "120px"}} onKeyDown={handleKeyDown} placeholder="Losses"></input>
                    <input type="number" min="0" name="season"  className="form-control m-3" style={{ width: "120px"}} onKeyDown={handleKeyDown} placeholder="Season"></input>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div>Fetches all teams corresponding to values more than or equal to inputs</div>
                        <div> 1. Please enter a natural number for wins and losses</div>
                        <div> 2. Please enter an exact year for season</div>
                        <div> 3. Hit Enter after inputing number for each field</div>
                    </div>
                </div>

                <Table className='text-center mt-4' striped bordered hover variant="dark">
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
            </div>
        </div>
    )
}
