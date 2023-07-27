import './styles.css'
import React, { useEffect, useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { useTable, Column } from 'react-table';

type Data = {
    uid: number;
    email: string;
    uname: string;
    urole: string;
    deleteUser: boolean;
};

type DynamicTableProps = {
    data: Data[];
    onSubmit: (uid: number, id: string, value: string) => void;
    onIconClick: (uid: number, username: string) => void;
};

const DynamicTable: React.FC<DynamicTableProps> = ({ data, onSubmit, onIconClick }) => {
    const EmailCell = ({ value }: any) => {
        return <span>{value}</span>
    };

    const keyDownWrapper = (e: any, id: string, uid: number) => {
        if (e.key === 'Enter') {
            onSubmit(uid, id, e.target.value);
        }
    };

    const UsernameCell = ({ column, row }: any) => {
        const [inputValue, setInputValue] = useState(row.original.uname);

        useEffect(() => {
            setInputValue(row.original.uname);
        }, [row.original.uname]);

        const safeSetInputValue = (text: string) => {
            // This function makes sure that admin is abiding to username rules
            // Specifically, we will limit to 28 characters
            if (text.length > 28) {
                text = text.substring(0, 28);
            }
            setInputValue(text);
        }

        return (
            <input
                type='text'
                value={inputValue}
                onBlur={() => setInputValue(row.original.uname)}
                onKeyDown={e => keyDownWrapper(e, column.id, row.original.uid)}
                onChange={e => safeSetInputValue(e.target.value)}
            />
        );
    };

    const RoleCell = ({ column, row }: any) => {
        return (
            <select name='Role' onChange={e => onSubmit(row.original.uid, column.id, e.target.value)}>
                <option value='user'>user</option>
                <option value='admin'>admin</option>
            </select>
        );
    };

    const IconCell = ({ row }: any) => {
        return (
            <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='delete'>This will permanently delete this user.</Tooltip>}
            >
                <p>
                <FcCancel onClick={() => onIconClick(row.original.uid, row.original.uname)} />
                </p>
            </OverlayTrigger>
        );
    };

    const columns: readonly Column<Data>[] = React.useMemo(
        () => [
            {
                Header: 'Email',
                accessor: 'email',
                Cell: EmailCell
            },
            {
                Header: 'Username',
                accessor: 'uname',
                Cell: UsernameCell
            },
            {
                Header: 'Role',
                accessor: 'urole',
                Cell: RoleCell
            },
            {
                Header: '',
                accessor: 'deleteUser',
                Cell: IconCell
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<Data>({ columns, data });

    return (
        <Table responsive {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup: any, index: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column: any) => (
                            <th {...column.getHeaderProps()} key={column.id}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row: any, index: any) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={index}>
                            {row.cells.map((cell: any, idx : number) => (
                                <td {...cell.getCellProps()} key={cell.column.id}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default DynamicTable;
