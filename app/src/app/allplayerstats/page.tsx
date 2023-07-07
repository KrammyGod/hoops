"use client"

import { useState, useEffect } from "react"
import { API } from "../config";

export default function AllPlayerStats() {    
    
    const [stats, setStats] = useState<{pid: number, name: string, asts: number, trbs: number, pts: number, games: number, seasons: number}[]>([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`${API}/allplayerstats`)
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
                        <th>PID</th>
                        <th>Name</th>
                        <th>ASTs</th>
                        <th>TRBs</th>
                        <th>PTSs</th>
                        <th>Games</th>
                        <th>Seasons</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.pid}</td>
                                <td>{stat.name}</td>
                                <td>{stat.asts}</td>
                                <td>{stat.trbs}</td>
                                <td>{stat.pts}</td>
                                <td>{stat.games}</td>
                                <td>{stat.seasons}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}