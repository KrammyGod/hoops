'use client'

import LoginForm from "../LoginForm";
import { Alert } from "react-bootstrap";

export default function AfterSignUp() {
    return (
        <LoginForm>
            <Alert dismissible variant="info" style={{ width: "100%", textAlign: "center" }}>
                Login to your new account!
            </Alert>
        </LoginForm>
    );
}
