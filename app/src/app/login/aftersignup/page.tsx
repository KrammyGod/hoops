'use client'

import LoginPage from "../page"
import { Alert } from "react-bootstrap"

export default () => (
    <LoginPage>
        <Alert dismissible variant="info" style={{ width: "100%", textAlign: "center" }}>
            Login to your new account!
        </Alert>
    </LoginPage>
)