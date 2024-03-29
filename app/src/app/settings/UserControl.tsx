'use client'

import '../bookmarks/list.css';
import { API } from '@/types/ApiRoute';
import { useSession } from '@/hooks/SessionProvider';
import { MdOutlineError } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { Toast, ToastContainer } from 'react-bootstrap';
import styles from '../page.module.css';
import AdminTable from './AdminTable';
import Pagination from '@components/pagination';

type NotifToastParams = {
    handleRemove: () => void;
    success: boolean;
    message: string;
};

const NotifToast = ({ handleRemove, success, message }: NotifToastParams) => {
    const [show, setShow] = useState(true);
    return (
        <Toast
            delay={7000}
            show={show}
            onClose={() => {
                handleRemove();
                setShow(false);
            }}
            autohide
        >
            <Toast.Header>
                {success ? (<BsFillCheckCircleFill style={{ color: 'green', fontSize: '20px' }} />) :
                    (<MdOutlineError style={{ color: 'red', fontSize: '20px' }} />)}
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default function Control() {
    const { session, loading } = useSession();
    const [page, setPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);
    const [users, setUsers] = useState<any[]>([]);
    const [toasts, setToasts] = useState<any[]>([]);
    const addToast = (newToast: any) => setToasts((toasts) => [...toasts, newToast]);
    const removeToast = (id: any) => setToasts((toasts) => toasts.filter((e) => e.id !== id));

    useEffect(() => {
        fetch(`${API}/pages?optn=users`, { method: 'GET' })
            .then(res => res.json())
            .then(data => setNumPages(data.data?.total ?? 1))
            .catch(() => setNumPages(1));
    }, []);

    useEffect(() => {
        if (loading) return;
        fetch(`${API}/users/getAll?page=${page}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => setUsers(data.data ?? []))
            .catch((err) => console.log(err));
    }, [session, loading, page]);

    const deleteUser = (uid: number, username: string) => {
        fetch(`${API}/users/deleteAdmin`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid })
        }).then((res) => {
            if (res.status === 200) {
                setUsers(oldUsers => {
                    return oldUsers.filter(user => user.uid !== uid);
                })
                addToast({ id: uid, success: true, message: `Successfully deleted ${username}`, Component: NotifToast });
            } else {
                res.json().then(res => console.error(res.message));
                addToast({ id: uid, success: false, message: `Failed to delete ${username}`, Component: NotifToast });
            }
        }).catch((err) => {
            console.log(err);
            addToast({ id: uid, success: false, message: `Failed to delete ${username}`, Component: NotifToast });
        });
    }

    const handleTableChange = (uid: number, id: string, val: string) => {
        setUsers(oldUsers => {
            const oldUser = oldUsers.find(user => user.uid === uid);
            fetch(`${API}/users/adminUpdate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: id === 'urole' ?
                    JSON.stringify({ uid, username: oldUser.uname, role: val }) :
                    JSON.stringify({ uid, username: val, role: oldUser.urole })
            }).then(res => {
                if (res.status === 200) {
                    // Successfully completed, update oldUsers
                    if (id === 'urole') {
                        addToast({
                            id: uid,
                            success: true,
                            message: `Successfully updated ${oldUser.uname}'s role to ${val}`,
                            Component: NotifToast
                        });
                    } else {
                        addToast({
                            id: uid,
                            success: true,
                            message: `Successfully updated ${oldUser.uname}'s name to ${val}`,
                            Component: NotifToast
                        });
                    }
                    oldUser[id] = val;
                } else {
                    // Failed update
                    if (id === 'urole') {
                        addToast({
                            id: uid,
                            success: true,
                            message: `Failed to update ${oldUser.uname}'s role`,
                            Component: NotifToast
                        });
                    } else {
                        addToast({
                            id: uid,
                            success: true,
                            message: `Failed to update ${oldUser.uname}'s name`,
                            Component: NotifToast
                        });
                    }
                    res.json().then(res => console.error(res.message));
                }
            }).catch(console.error);
            return oldUsers;
        });
    };

    return (
        <>
            <ToastContainer position='top-end'>
                {toasts.map(({ id, Component, success, message }, index) => (
                    <Component key={id} success={success} message={message} handleRemove={() => removeToast(id)} />
                ))}
            </ToastContainer>
            <div className={styles.settingsContainer}>
                <AdminTable
                    data={users}
                    onSubmit={handleTableChange}
                    onIconClick={deleteUser}
                />
                <Pagination
                    page={page}
                    numPages={numPages}
                    onPageChange={page => setPage(page)}
                />
            </div>
        </>
    )
}
