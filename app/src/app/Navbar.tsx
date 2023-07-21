'use client'

import styles from './page.module.css';
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { LuSettings } from "react-icons/lu";
import { BiSearchAlt } from "react-icons/bi";
import { signIn, signOut, getSession } from 'next-auth/react';

export default function CustomNavbar() {
  const router = useRouter();
  const [bookmarksFn, setBookmarksLink] = useState(() => () => {});
  const [settingsFn, setSettingsLink] = useState(() => () => {});
  const [usersBtn, setUsersBtn] = useState<any>();
  
  const loginBtn = <Button href="/login" variant="outline-primary" onClick={() => signIn(undefined, { callbackUrl: '/' })}>Login/Signup</Button>;
  const logoutBtn = <Button href="/login" variant="outline-danger" onClick={() => signOut()}>Logout</Button>;
  const bookmarksBtn = <Button variant="info" onClick={bookmarksFn}>Bookmarks</Button>;
  const settingsBtn = 
    <Button variant='secondary' onClick={settingsFn}>
      <h3 style={{ margin: 0, fontSize: "1.3rem" }}><LuSettings /></h3>
    </Button>;

  useEffect(() => {
    // Ensure getSession is only called once per load
    getSession().then(session => {
      if (session) {
        setUsersBtn(logoutBtn);
        setBookmarksLink(() => () => router.push("/bookmarks"));
        setSettingsLink(() => () => router.push("/settings"));
      } else {
        setUsersBtn(loginBtn);
        // Require to use this to ensure proper redirection
        setBookmarksLink(() => () => signIn(undefined, { callbackUrl: "/bookmarks" }));
        setSettingsLink(() => () => signIn(undefined, { callbackUrl: "/settings" }));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
