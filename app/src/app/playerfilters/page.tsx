"use client"

import { useState, useEffect } from "react";
import { API } from "@/types/ApiRoute";
import React from "react";
import styles from '../page.module.css';
import Table from 'react-bootstrap/Table';
import { generateKey } from "crypto";

export default function PlayerFilter() {
    const [results, setResults] = useState<{ id: number, name: string, rebounds: number, assists: number, points: number, games: number, season: number }[]>([]);
    const [rebounds, setRebounds] = useState(-1)
    const [assists, setAssists] = useState(-1)
    const [points, setPoints] = useState(-1)
    const [games, setGames] = useState(-1)
    const [season, setSeason] = useState(-1)

    useEffect(() => {
        fetch(`${API}/playerfilter?rebounds=${rebounds}&assists=${assists}&points=${points}&games=${games}&season=${season}`)
          .then(response => response.json())
          .then(data => setResults(data.data ?? []))
          .catch(error => setResults([]))
    }, [rebounds, assists, points, games, season]);

    const handleKeyDown = (event: any) => {
        const name = event.target.name
        const value = event.target.value.length == 0 ? -1 : event.target.value
        if (event.key === 'Enter') {
            switch (name) {
                case "rebounds":
                    setRebounds(value)
                    break
                case "assists": 
                    setAssists(value)
                    break
                case "points": 
                    setPoints(value)
                    break
                case "games": 
                    setGames(value)
                    break
                case "season": 
                    setSeason(value)
                    break
            }
        }
	}

    const generateCols = () => {
        if (results.length === 0) return (<tr><td colSpan={7} align='center'>No data found.</td></tr>)
        return (
            <>
            {results.map((result, index) => (
                <tr key={index}>
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

    return (
        <div className={styles.settingsOuterContainer}>
            <div className={styles.settingsContainer}>
                <div className="d-flex justify-content-center mb-1">
                    <input type="number" min="0" name="rebounds" className="form-control m-3" style={{ width: "120px"}} onKeyDown={handleKeyDown} placeholder="Rebounds"></input>
                    <input type="number" min="0" name="assists" className="form-control m-3" style={{ width: "120px"}} onKeyDown={handleKeyDown} placeholder="Assists"></input>
                    <input type="number" min="0" name="points" className="form-control m-3" style={{ width: "120px"}} onKeyDown={handleKeyDown} placeholder="Points"></input>
                    <input type="number" min="0" name="games" className="form-control m-3" style={{ width: "120px"}} onKeyDown={handleKeyDown} placeholder="Games"></input>
                    <input type="number" min="0" name="season" className="form-control m-3" style={{ width: "120px"}} onKeyDown={handleKeyDown} placeholder="Season"></input>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div>Fetches all players corresponding to values more than or equal to inputs</div>
                        <div> 1. Please enter a natural number for rebounds, assists, points and games</div>
                        <div> 2. Please enter an exact year for season</div>
                        <div> 3. Hit Enter after inputing number for each field</div>
                    </div>
                </div>

                <Table className='text-center mt-4' striped bordered hover variant="dark">
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
            </div>
        </div>
    )
}
