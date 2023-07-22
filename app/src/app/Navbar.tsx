'use client'

import { LuSettings } from 'react-icons/lu';
import { BiSearchAlt } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import styles from './page.module.css';
import useSession from '@hooks/Auth';

export default function CustomNavbar() {
    const [usersBtn, setUsersBtn] = useState<React.ReactNode>();
    const { session, loading } = useSession();
    const path = usePathname() ?? '/';

    const loginBtn = <Button variant="outline-primary" onClick={() => signIn(undefined, { callbackUrl: path })}>Login/Signup</Button>;
    const logoutBtn = <Button variant="outline-danger" onClick={() => signOut({ callbackUrl: path })}>Logout</Button>;
    // Bookmarks and settings are protected. Navigating to them will automatically
    // redirect to login if they are not logged in.
    const bookmarksBtn = <Button href='/bookmarks' variant="info">Bookmarks</Button>;
    const settingsBtn =
        <Button href='/settings' variant='secondary'>
            <h3 style={{ margin: 0, fontSize: "1.3rem" }}><LuSettings /></h3>
        </Button>;

    useEffect(() => {
        // Wait for loading to finish
        if (loading) return;
        // Update based on session state
        if (session) {
            setUsersBtn(logoutBtn);
        } else {
            setUsersBtn(loginBtn);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, loading]);

    const searchBtn =
        <Button href="/search" variant='secondary' style={{ color: "coral" }}>
            <div className={styles.rowContainer}>
                Search
                <h3 style={{ margin: "0 0 0 8px", fontSize: "1.3rem" }}><BiSearchAlt /></h3>
            </div>
        </Button>;

    return (
        <Navbar bg="light" collapseOnSelect expand="sm">
            <Container>
                <Navbar.Brand href="/">Hoops</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse aria-controls="responsive-navbar-nav" className="justify-content-end">
                    <Nav className={styles.sideStack}>
                        <NavDropdown title="All Players/Teams">
                            <NavDropdown.Item href="/allplayerstats">All Players</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/allteamstats">All Teams</NavDropdown.Item>
                        </NavDropdown>
                        {searchBtn}
                        {bookmarksBtn}
                        {settingsBtn}
                        {usersBtn}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
