'use client'

import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useAuth } from './auth'

export default () => {

  const [usersBtn, setUsersBtn] = useState<any>();
  const { handleAuth, auth, username } = useAuth()

  const loginBtn = <Nav.Link href="/login">Login</Nav.Link>
  const logoutBtn = <Nav.Link href="/login" onClick={() => handleAuth(false)}>Logout</Nav.Link>

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
                <Nav>
                  {usersBtn}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
