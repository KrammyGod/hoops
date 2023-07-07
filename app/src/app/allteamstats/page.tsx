"use client"

import { useState, useEffect } from "react"

export default function AllTeamStats() {    
    
    const [stats, setStats] = useState<{abbrev: string, tname: string, wins: number, losses: number, seasons: number}[]>([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/allteamstats`)
          .then(response => response.json())
          .then(data => {
            setStats(data)
          })
          .catch(error => {
            setError(error)
          })
    }, [])

    return (
        <div>
            <table className="table table-bordered table-sm m-4">
                <thead>
                    <tr>
                        <th>ABBREV</th>
                        <th>Name</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Seasons</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.abbrev}</td>
                                <td>{stat.tname}</td>
                                <td>{stat.wins}</td>
                                <td>{stat.losses}</td>
                                <td>{stat.seasons}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}