'use client'

import styles from './page.module.css'
import Leaderboards from './leaderboards'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default () => {
  return (
    <Navbar bg="light">
        <Container>
            <Navbar.Brand href="/">Hoops</Navbar.Brand>
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
