import './styles.css'
import React from 'react';
import { FcCancel } from "react-icons/fc";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useTable, useSortBy, useFilters, usePagination, Column } from 'react-table';

type Data = {
    email: string;
    uname: string;
    urole: string;
    deleteUser: boolean;
};

type DynamicTableProps = {
    data: Data[];
    onSubmit: (uid: number, id: string, value: string) => void;
    onIconClick: (row: Data) => void;
};

const DynamicTable: React.FC<DynamicTableProps> = ({ data, onSubmit, onIconClick }) => {
    const EmailCell = ({ value }: any) => {
        return <span>{value}</span>
    };

    const keyDownWrapper = (e: any, id: string, uid: number) => {
        console.log("cliuck")
        if (e.key === 'Enter') {
            onSubmit(uid, id, e.target.value);
        }
    };

    const UsernameCell = ({ value, column, row }: any) => {
        return (
            <input
                defaultValue={value}
                onKeyDown={e => keyDownWrapper(e, column.id, row.original.uid)}
            />
        );
    };

    const RoleCell = ({ column, row }: any) => {
        return (
            <select name='Role' id='urole' onChange={e => onSubmit(column.id, e.target.value, row.original.uid)}>
                <option value='user'>user</option>
                <option value='admin'>admin</option>
            </select>
        );
    };

    const IconCell = ({ row }: any) => {
        return (
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="delete">This will permanently delete this user.</Tooltip>}
            >
                <p style={{ margin: 0, fontSize: "24px", textAlign: "center", cursor: "pointer" }}>
                    <FcCancel onClick={() => onIconClick(row.original.uid)} />
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
    } = useTable<Data>({ columns, data }, useFilters, useSortBy, usePagination);

    return (
        <Table {...getTableProps()}>
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
                            {row.cells.map((cell: any) => (
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
