'use client'

import LoginForm from "./LoginForm"

export default function Login({ searchParams } : { searchParams: any }) {
    return (
        <LoginForm params={searchParams}></LoginForm>
    );
}
