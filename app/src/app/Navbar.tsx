'use client'

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LuSettings } from "react-icons/lu";
import { useAuth } from './auth';

const loginBtn = <Button href="/login" variant="outline-primary">Login/Signup</Button>;
const logoutBtn = <Button href="/login" variant="outline-danger">Logout</Button>;
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

  useEffect(() => {
    if (auth) {
      setUsersBtn(logoutBtn)
      setBookmarksLink("/bookmarks")
      setSettingsLink("/settings")
    } else {
      setUsersBtn(loginBtn)
      setBookmarksLink("/login")
      setSettingsLink("/login")
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
                  {bookmarksBtn}
                  {settingsBtn}
                  {usersBtn}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}
