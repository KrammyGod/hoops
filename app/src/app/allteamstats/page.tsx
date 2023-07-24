"use client"

import { useState, useEffect } from "react";
import { API } from "@/types/ApiRoute";
import React from "react";
import Pagination from "../pagination";

export default function AllTeamStats() {    
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
          .then(data => setNumPages(data.total))
          .catch(err => setError(err))
    }, []);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

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
            <Pagination 
                page={page}
                numPages={numPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}