"use client"

import { useState, useEffect } from "react";
import { API } from "@/types/ApiRoute";
import React from "react";

export default function AllTeamStats() {    
    const [stats, setStats] = useState<{abbrev: string, tname: string, wins: number, losses: number, seasons: number}[]>([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        fetch(`${API}/allteamstats?page=1`)
          .then(response => response.json())
          .then(data => setStats(data))
          .catch(err => setError(err))
    }, []);

    console.log(totalPages)

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
    );
}
