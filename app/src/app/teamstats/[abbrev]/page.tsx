'use client'

import { useState, useEffect } from 'react';
import { API } from '@/types/ApiRoute';
import React from 'react';
import styles from '../../page.module.css';

export default function PlayerStats({ params }: {
    params: { abbrev: string }
}) {    
    const [name, setName] = useState([])
    const [teamStats, setTeamStats] = useState<{wins: number, losses: number, season: number}[]>([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`${API}/teamstats/${params.abbrev}`)
          .then(response => response.json())
          .then(data => {
            setTeamStats(data.stats)
            setName(data.team.tname)
          })
          .catch(error => setError(error))
    }, [params.abbrev])

    if (error) {
        return (
            <div className={styles.settingsOuterContainer}>
                <div>No team with abbrev {params.abbrev} exists</div>
            </div>
        )
    }

    return (
        <div>
            <table className='table table-bordered table-sm m-4'>
                <thead>
                    <tr>
                        <th colSpan={3}>{params.abbrev} {name}</th>
                    </tr>
                    <tr>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Season</th>
                    </tr>
                </thead>
                <tbody>
                    {teamStats.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.wins}</td>
                                <td>{stat.losses}</td>
                                <td>{stat.season}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}