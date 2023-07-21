"use client"

import styles from "../page.module.css";
import ModifyUser from "../signup/SignUpForm";
import DeleteUser from "./DeleteUser";
import { useRouter } from "next/navigation";
import { Card, Button } from "react-bootstrap";
import { API } from "@/types/config";
import useSession from "@/hooks/auth";

// TODO: Block this page if session does not exist
export default function Settings() {
    const router = useRouter();
    const { session } = useSession();

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
                uid: session?.user.id,
                email: form[1].value,
                password: form[2].value,
                username: form[0].value
            })
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });

        // TODO: FIXME
        // handleAuth(false);
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
                                name: session?.user.name ?? '',
                                email: session?.user.email ?? ''
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
