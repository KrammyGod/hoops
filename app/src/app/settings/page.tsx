'use client'

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Card, Alert } from 'react-bootstrap';
import { API } from '@/types/ApiRoute';
import styles from '../page.module.css';
import ModifyForm from './ModifyForm';
import DeleteUser from './DeleteUser';
import useSession from '@hooks/Auth';
import useProtect from '@hooks/Protected';
import UserControl from './UserControl';

function Settings() {
    const { session } = useSession();
    const [validated, setValidated] = useState(true);

    const handleSubmit = (event: any) => {
        const form = new FormData(event.target);

        event.preventDefault();
        event.stopPropagation();

        setValidated(true);
        fetch(`${API}/users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.get('name'),
                email: form.get('email'),
                old_password: form.get('old_password'),
                new_password: form.get('new_password')
            })
        })
        .then((res) => {
            if (res.status !== 200) {
                // Wrong password
                setValidated(false);
            } else {
                signOut({ callbackUrl: '/login?update=true' });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className={styles.settingsOuterContainer}>
            {session?.user.role == "admin" ? 
                <>
                    <UserControl />
                </> 
            : <></>}
            <div className={styles.settingsContainer}>
                <Card className={styles.card}>
                    <Card.Title>Change User Settings</Card.Title>
                    <Card.Text>Must enter old password**</Card.Text>
                    <Card.Body>
                        {!validated ? <Alert variant='danger'>Incorrect password</Alert> : <></>}
                        <ModifyForm
                            submit={handleSubmit}
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
                    style={{ justifyContent: 'space-between' }}
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

// Wrap inside our protect hook
export default function SettingsProtected() {
    return useProtect(<Settings />);
}
