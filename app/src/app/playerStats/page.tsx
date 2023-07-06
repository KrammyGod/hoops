"use client"
// 'USE CLIENT' MEANT FOR WHAT?
// HOW TO CONNECT TO DATABASE?
// USE EFFECT NOT WORKING - PROB RELATED TO CONNECTION TO DATABSE?

import { useState, useEffect } from "react"
import { getPlayerStats } from "../../../modules/database";

export default function Page(pid: number) {
    pid = 50
    const [firstName, setFirstName] = useState([])
    const [lastName, setLastName] = useState([])
    const [playerStats, setPlayerStats] = useState<{assists: number, points: number, games: number, season: number, abbrev: string, tname: string}[]>([]);
    const [error, setError] = useState(null);

    /*
    useEffect(() => {
        getPlayerStats(pid)
            .then(data => {
                setPlayerStats(data.stats)
                setFirstName(data.player.firstname)
                setLastName(data.player.lastname)
            })
            .catch(error => {setError(error);});
    }, [pid]);
    */

    return (
        <div>
            <div className="card border-0 m-4">
                <div className="card-body">
                    #{pid} {firstName} {lastName}
                </div>
            </div>
            <div></div>
            <table  className="table table-sm m-4">
                <thead>
                    <tr>
                        <th>Assists</th>
                        <th>Points</th>
                        <th>Games</th>
                        <th>Season</th>
                        <th>Abbrev</th>
                        <th>Team Name</th>
                    </tr>
                </thead>
                {/*
                <tbody>
                    {playerStats.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.assists}</td>
                                <td>{stat.points}</td>
                                <td>{stat.games}</td>
                                <td>{stat.season}</td>
                                <td>{stat.abbrev}</td>
                                <td>{stat.tname}</td>
                            </tr>
                        ))}
                </tbody>
                */}
            </table>
        </div>
    )
}