'use client'

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { LuSettings } from "react-icons/lu";
import { BiSearchAlt } from "react-icons/bi";
import { useAuth } from './auth';

export default function CustomNavbar() {
  const [bookmarksLink, setBookmarksLink] = useState("/login");
  const [settingsLink, setSettingsLink] = useState("/login");
  const [usersBtn, setUsersBtn] = useState<any>();
  const { handleAuth, auth } = useAuth();

  const loginBtn = <Button href="/login" variant="outline-primary">Login/Signup</Button>;
  const logoutBtn = <Button href="/login" variant="outline-danger" onClick={() => handleAuth(false)}>Logout</Button>;
  const bookmarksBtn = <Button href={bookmarksLink} variant="info">Bookmarks</Button>;
  const settingsBtn = 
    <Button href={settingsLink} variant='secondary'>
      <h3 style={{ margin: 0, fontSize: "1.3rem" }}><LuSettings /></h3>
    </Button>;
  const searchBtn = 
    <Button href="/search" variant='secondary' style={{ color: "coral" }}>
      <div className={styles.rowContainer}>
        Search
        <h3 style={{ margin: "0 0 0 8px", fontSize: "1.3rem" }}><BiSearchAlt /></h3>
      </div>
    </Button>;

  useEffect(() => {
    if (auth) {
      setUsersBtn(logoutBtn);
      setBookmarksLink("/bookmarks");
      setSettingsLink("/settings");
    } else {
      setUsersBtn(loginBtn);
      setBookmarksLink("/login");
      setSettingsLink("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
