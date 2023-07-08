'use client'
import { API } from "../config";
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import styles from '../page.module.css'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

export default function Search() {
    const [radioValue, setRadioValue] = useState(1);
    const [results, setResults] = useState<{ pid : string, firstName : string, lastName : string}[]>([]);
    const [val, setVal] = useState("");

    const radios = [
        { name: 'Search for Player', value: 1 },
        { name: 'Search for Team', value: 2 },
    ];

    const radioChange = (val : number) => {
        setRadioValue(val);
    };

    const generateCols = () => {
        if (results.length == 0) {
            return (<tr><td colSpan={3} align='center'>Nothing found.</td></tr>);
        } else {
            return results.map((item) => (
                <tr key={item.pid}>
                <td align='center'>{item.pid}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                </tr>
            ));
        }

    }

    const handleSubmit = (event : any) => {
        if (radioValue == 1) {
            fetch(`${API}/playersearch?id=${val}`)
                .then((res) => res.json())
                .then((data) => setResults(data.data ?? []))
                .catch(() => setResults([]));
        } else {
            fetch(`${API}/teamsearch?id=${val}`)
                .then((res) => res.json())
                .then((data) => setResults(data.data ?? []))
                .catch(() => setResults([]));
        }
    }
    return (
        <main className={styles.main}>
            <div>
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
                <Table striped bordered hover variant="dark">
                    <thead>
                    </thead>
                    <tbody>
                        {generateCols()}
                    </tbody>
                </Table>
            </div>
        </main>
    
    )
}