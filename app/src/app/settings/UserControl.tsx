'use client'

import { OverlayTrigger, Tooltip, Toast, ToastContainer } from "react-bootstrap";
import useSession from "@hooks/Auth"
import BootstrapTable from 'react-bootstrap-table-next';
// @ts-ignore
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { AiOutlineEdit } from "react-icons/ai";
import { FcCancel } from "react-icons/fc"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { MdOutlineError } from "react-icons/md"
import { API } from "@/types/ApiRoute";
import "../bookmarks/list.css"
import styles from '../page.module.css';
import React, { useEffect, useState } from "react";

// @ts-ignore
const NotifToast = ({ handleRemove, success, message }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      setShow(true);
    }, []);
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
            {success ? (<BsFillCheckCircleFill style={{ color: "green", fontSize: "20px" }} />) : (<MdOutlineError style={{ color: "red", fontSize: "20px"  }} />)}
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    );
  };

export default () => {
    const { session } = useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [toasts, setToasts] = useState<any[]>([]);
    const addToast = (newToast: any) => setToasts((toasts) => [...toasts, newToast]);
    const removeToast = (id: any) => setToasts((toasts) => toasts.filter((e) => e.id !== id));

    useEffect(() => {
        fetch(`${API}/users/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => setUsers(data.data.filter((user: any) => user.uid !== session?.user.id)))
        .catch((err) => console.log(err));
    }, [])

    const deleteUser = (uid: number, username: string) => {
        fetch(`${API}/users/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid })
        })
        .then((res) => res.json())
        .then((data) => {
            setUsers(users.filter((it: any) => it.uid !== uid))
            addToast({ id: uid, success: true, message: `Successfully deleted ${username}`, Component: NotifToast })
        })
        .catch((err) => {
            console.log(err)
            addToast({ id: uid, success: false, message: `Failed to delete ${username}`, Component: NotifToast })
        });
    }

    const columns = [{
        dataField: 'email',
        text: 'Email',
        editable: false
    }, {
        dataField: 'uname',
        text: 'Username',
        headerFormatter: (column: any) => {
            return <OverlayTrigger 
                placement="bottom"
                overlay={<Tooltip id="toolName">This column is editable. Click on a cell and press enter to save changes.</Tooltip>}
            >
                <p style={{ margin: 0 }}>
                    {column.text}
                    <AiOutlineEdit style={{ fontSize: "20px", color: "blue"}} />
                </p>
            </OverlayTrigger>
    }}, {
        dataField: 'urole',
        text: 'Role',
        headerFormatter: (column: any) => {
            return <OverlayTrigger 
                placement="bottom"
                overlay={<Tooltip id="roleName">This column is editable. Click on a cell and press enter to save changes.</Tooltip>}
            >
                <p style={{ margin: 0 }}>
                    {column.text}
                    <AiOutlineEdit style={{ fontSize: "20px", color: "blue"}} />
                </p>
            </OverlayTrigger>
        },
        editor: {
            type: Type.SELECT,
            options: [{
                value: "admin",
                label: "admin"
            }, {
                value: "user",
                label: "user"
            }]
        }
    }, {
        text: "",
        dataField: 'deleteUser',
        isDummyField: true,
        editable: false,
        headerStyle: { width: "50px" },
        // @ts-ignore
        formatter: (cellContent, row) => (
            <OverlayTrigger 
                placement="bottom"
                overlay={<Tooltip id="delete">This will permanently delete this user.</Tooltip>}
            >
                <p style={{ margin: 0, fontSize: "24px", textAlign: "center", cursor: "pointer" }}>
                    <FcCancel onClick={() => deleteUser(row.uid, row.uname)}/>
                </p>
            </OverlayTrigger>
        )
    }];
    
    // @ts-ignore
    const handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {
        const result = data.map((row: any) => {
            if (row.uid === rowId) {
                fetch(`${API}/users/adminUpdate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: dataField == "urole" ? 
                        JSON.stringify({ uid: row.uid, username: row.uname, role: newValue }) :
                        JSON.stringify({ uid: row.uid, username: newValue, role: row.urole }) 
                })
                .then((res) => res.json())
                .then((data) => {
                    addToast({ id: data.data.uid, success: true, message: `Successfully changed ${dataField} of ${row.email} to ${newValue}`, Component: NotifToast })
                })
                .catch((err: any) => {
                    addToast({ id: row.uid, success: false, message: `Failed to modify ${dataField} of ${row.email}`, Component: NotifToast })
                });
                const newRow = {...row}
                newRow[dataField] = newValue
                return newRow
            }
            return row
        });
        setUsers(result)
    }
    return (
        <>
            <ToastContainer position="top-end">
                {toasts.map(({id, Component, success, message}, index) => (
                    <Component key={id} success={success} message={message} handleRemove={() => removeToast(id)}/>
                ))}
            </ToastContainer>
            <div className={styles.settingsContainer}>
                <BootstrapTable
                    hover
                    rowStyle={{ wordBreak: 'break-all' }}
                    keyField="uid"
                    columns={ columns }
                    data={ users }
                    onTableChange={ handleTableChange }
                    cellEdit = {cellEditFactory({ mode: 'click' })}
                    remote={{
                        cellEdit: true
                    }}
                />
            </div>
        </>
    )
}