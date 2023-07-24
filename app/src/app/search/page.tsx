'use client'

import { API } from "@/types/ApiRoute";
import { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import styles from '../page.module.css';
import Table from 'react-bootstrap/Table';
import useSession from "@hooks/Auth";
import Pagination from "../pagination";

export default function Search() {
    const [radioValue, setRadioValue] = useState(1);
    const [results, setResults] = useState<{ pid : string, firstname : string, lastname : string, tname : string, abbrev : string}[]>([]);
    const [val, setVal] = useState("");
    const [searchVal, setSearchVal] = useState(1);
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const { session } = useSession();
    const [ppage, setPPage] = useState<number>(1);
    const [numPPages, setNumPPages] = useState<number>(1);
    const [tpage, setTPage] = useState<number>(1);
    const [numTPages, setNumTPages] = useState<number>(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API}/playersearch?id=${val}&page=${ppage}`)
          .then(response => response.json())
          .then((data) => setResults(data.data ?? []))
          .catch(err => setError(err));
    }, [ppage]);

    useEffect(() => {
        fetch(`${API}/teamsearch?id=${val}&page=${tpage}`)
          .then(response => response.json())
          .then((data) => setResults(data.data ?? []))
          .catch(err => setError(err));
    }, [tpage]);


    const handlePPageChange = (page: number) => {
        setPPage(page);
    };

    const handleTPageChange = (page: number) => {
        setTPage(page);
    };

    const radios = [
        { name: 'Search for Player', value: 1 },
        { name: 'Search for Team', value: 2 },
    ];

    const radioChange = (val : number) => {
        setRadioValue(val);
    };

    const generateHeader = () => {
        if (searchVal == 1) {
            return (<><th>Player ID</th><th>First Name</th><th>Last Name</th></>);
        } else {
            return (<><th>Team Abbreviation</th><th>Team Name</th></>);
        }
    }

    const generateCols = () => {
        if (searchVal == 1) {
            if (results.length == 0) {
                return (<tr><td colSpan={4} align='center'>No players found.</td></tr>);
            } else {
                return results.map((item) => (
                    <tr style={{cursor:'pointer'}} onClick={event =>  window.location.href=`/playerstats/${item.pid}`} key={item.pid}>
                        <td align='center'>{item.pid}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                    </tr>
                ));
            }
        } else {
            if (results.length == 0) {
                return (<tr><td colSpan={3} align='center'>No teams found.</td></tr>);
            } else {
                return results.map((item) => (
                    <tr style={{cursor:'pointer'}} onClick={event =>  window.location.href=`/teamstats/${item.abbrev}`} key={item.abbrev}>
                    <td align='center'>{item.abbrev}</td>
                    <td>{item.tname}</td>
                    </tr>
                ));
            }
        }
    }

    const generatePagination = () => {
        if (searchVal == 1) {
            return (
                <Pagination 
                    page={ppage}
                    numPages={numPPages}
                    onPageChange={handlePPageChange}
                />
            );
        } else {
            return (
                <Pagination 
                    page={tpage}
                    numPages={numTPages}
                    onPageChange={handleTPageChange}
                />
            )
        }
    }

    const handleSubmit = (event : any) => {
        event.preventDefault();
        setSearchVal(radioValue);
        if (radioValue == 1) {
            setPPage(1)
            fetch(`${API}/playersearch?id=${val}`)
                .then((res) => res.json())
                .then((data) => setResults(data.data ?? []))
                .catch(() => setResults([]));
            
            fetch(`${API}/pages?optn=srpl&name=${val}`)
                .then(response => response.json())
                .then(data => setNumPPages(data.total))
                .catch(err => setError(err))
            /*
            getBookmarks()
                .then((data) => {
                    let pids = data.data.map((marked: any) => marked["pid"])
                    setBookmarks(pids)
                })
            */
        } else {
            setTPage(1)
            fetch(`${API}/teamsearch?id=${val}`)
                .then((res) => res.json())
                .then((data) => setResults(data.data ?? []))
                .catch(() => setResults([]));
            
            fetch(`${API}/pages?optn=srtm&name=${val}`)
                .then(response => response.json())
                .then(data => setNumTPages(data.total))
                .catch(err => setError(err))
        }
    }
    return (
        <div className={styles.settingsOuterContainer}>
            <h1 className='text-center'>Search</h1>
            <ToggleButtonGroup name="types" type="radio" value={radioValue} onChange={radioChange}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        value={radio.value}
                        variant="secondary"
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <div className={styles.settingsContainer}>
                <Container className="mt-5">
                    <Row>
                        <Col sm={12}>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 rounded-pill"
                            aria-label="Search"
                            onChange={e => setVal(e.target.value)}
                            />
                        </Form>
                        </Col>
                    </Row>
                </Container>
                <Table className='text-center mt-5' striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {generateHeader()}
                    </tr>
                    </thead>
                    <tbody>
                        {generateCols()}
                    </tbody>
                </Table>
            </div>
            {generatePagination()}
        </div>
    );
}