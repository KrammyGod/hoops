"use client"

import { useState, useEffect } from "react";
import { API } from "@/types/ApiRoute";
import { AiOutlineLink } from "react-icons/ai";
import useSession from "@hooks/Auth";
import BookmarksBtn, { getBookmarks } from "../bookmarks/BookmarkBtn";
import styles from "../page.module.css";
import React from "react";
import Pagination from "../pagination";

export default function AllPlayerStats() {    
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const [stats, setStats] = useState<{pid: number, name: string, asts: number, trbs: number, pts: number, games: number, seasons: number}[]>([]);
    const [error, setError] = useState(null);
    const { session } = useSession();
    const [page, setPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);

    useEffect(() => {
        fetch(`${API}/allplayerstats?page=${page}`)
          .then(response => response.json())
          .then(data => setStats(data))
          .catch(err => setError(err));

        getBookmarks()
            .then((data) => {
                let pids = data.data.map((marked: any) => marked["pid"])
                setBookmarks(pids)
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        fetch(`${API}/pages?optn=plyr`)
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
                                        {session ? <BookmarksBtn pid={stat.pid} initialValue={bookmarks.includes(stat.pid)} /> : ""}
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
            <Pagination 
                page={page}
                numPages={numPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}