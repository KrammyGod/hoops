'use client'

import { useRouter } from "next/navigation"
import { Button } from "react-bootstrap"
import SignUpForm from "./SignUpForm";
import { API } from "../config";
import styles from "../page.module.css";

export default function SignUp() {
    const router = useRouter();

    const handleSubmit = (event: any) => {
        const form = event.target;

        event.preventDefault();
        event.stopPropagation();

        fetch(API + "/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: form[1].value,
                password: form[2].value,
                username: form[0].value
            })
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
        });

        router.push("/login/aftersignup");
    }

    return (
        <div className={styles.outerContainer}>
            <div className={styles.subContainer}>
                <SignUpForm 
                    btns={
                        <div className={styles.rowContainer}>
                            <Button type="submit">Sign Up</Button>
                            <p className={styles.space}>or</p>
                            <Button href="/login" variant="secondary">Login</Button>
                        </div>
                    }
                    submit={handleSubmit}
                />
            </div>
        </div>
    );
}
