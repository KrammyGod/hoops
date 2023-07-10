"use client"

import { useState, useEffect } from "react"
import { API } from "../config"
import { AiOutlineLink } from "react-icons/ai"
import { useAuth } from "../auth"
import BookmarksBtn, { getBookmarks } from "../bookmarks/BookmarkBtn"
import styles from "../page.module.css"
import React from "react"

export default function AllPlayerStats() {    
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const [stats, setStats] = useState<{pid: number, name: string, asts: number, trbs: number, pts: number, games: number, seasons: number}[]>([])
    const [error, setError] = useState(null)
    const { auth, uid } = useAuth();

    useEffect(() => {
        fetch(`${API}/allplayerstats`)
          .then(response => response.json())
          .then(data => setStats(data))
          .catch(err => setError(err))

        getBookmarks(uid)
            .then((data) => {
                let pids = data.data.map((marked: any) => marked["pid"])
                setBookmarks(pids)
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
                                <td>
                                    <div className={styles.rowContainer} style={{ justifyContent: "space-between" }}>
                                        <div>
                                            <a href={`/playerstats/${stat.pid}`}>{stat.name}</a>
                                            <AiOutlineLink color="blue" />
                                        </div>
                                        {auth ? <BookmarksBtn pid={stat.pid} uid={uid} initialValue={bookmarks.includes(stat.pid)} /> : ""}
                                    </div>
                                </td>
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