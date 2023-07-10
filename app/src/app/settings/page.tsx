"use client"

import styles from "../page.module.css";
import ModifyUser from "../signup/SignUpForm";
import DeleteUser from "./DeleteUser";
import { useRouter } from "next/navigation";
import { Card, Button } from "react-bootstrap";
import { API } from "../config";
import { useAuth } from "../auth";

export default function Settings() {
    const router = useRouter();
    const { handleAuth, uid, username, email } = useAuth();

    const handleSubmit = (event: any) => {
        const form = event.target;

        event.preventDefault();
        event.stopPropagation();

        fetch(API + "/users/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: uid,
                email: form[1].value,
                password: form[2].value,
                username: form[0].value
            })
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });

        handleAuth(false);
        router.push("/login");
    }

    return (
        <div className={styles.settingsOuterContainer}>
            <div className={styles.settingsContainer}>
                <Card className={styles.card}>
                    <Card.Title>Change User Settings</Card.Title>
                    <Card.Text>Must create new password**</Card.Text>
                    <Card.Body>
                        <ModifyUser
                            submit={handleSubmit}
                            btns={<Button type="submit">Change</Button>}
                            values={{
                                name: username,
                                email: email
                            }}
                        />
                    </Card.Body>
                </Card>
            </div>
            <div className={styles.settingsContainer}>
                <Card 
                    className={`${styles.card} ${styles.rowContainer}`} 
                    style={{ justifyContent: "space-between" }}
                >
                    <div>
                        <Card.Title>Delete Account</Card.Title>
                        <Card.Text>Cannot be undone**</Card.Text>
                    </div>
                    <DeleteUser />
                </Card>
            </div>
        </div>
    );
}
