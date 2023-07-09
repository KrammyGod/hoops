'use client'

import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useAuth } from './auth'

export default () => {

  const [usersBtn, setUsersBtn] = useState<any>();
  const { handleAuth, auth, username } = useAuth()

  const loginBtn = <Button href="/login" variant="outline-primary">Login</Button>
  const logoutBtn = <Button href="/login" variant="outline-danger" onClick={() => handleAuth(false)}>Logout</Button>
  const bookmarksBtn = <Button href="/bookmarks" variant="info">Bookmarks</Button>

  useEffect(() => {
    if (auth) {
      setUsersBtn(logoutBtn)
    } else {
      setUsersBtn(loginBtn)
    }
  }, [auth])

  return (
    <Navbar bg="light">
        <Container>
            <Navbar.Brand href="/">Hoops</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav className={styles.sideStack}>
                  {bookmarksBtn}
                  {usersBtn}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
