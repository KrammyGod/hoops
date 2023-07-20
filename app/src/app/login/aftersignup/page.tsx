'use client'

import LoginForm from "../LoginForm";
import { Alert } from "react-bootstrap";

export default function AfterSignUp({ searchParams } : { searchParams: any }) {
    return (
        <LoginForm params={searchParams}>
            <Alert dismissible variant="info" style={{ width: "100%", textAlign: "center" }}>
                Login to your new account!
            </Alert>
        </LoginForm>
    );
}
