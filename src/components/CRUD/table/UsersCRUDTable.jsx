import CRUDTable from "../CRUDTable";
import React from 'react';
import { usersCRUD } from '../../../http';

export default function UsersCRUDTable({...props}) {
    const columns = [
        {title: "ID", dataIndex: 'id', key: 'id'},
        {title: "Email", dataIndex: 'email', key: 'email'},
        {title: "Имя", dataIndex: 'firstName', key: 'firstName'},
        {title: "Фамилия", dataIndex: 'lastName', key: 'lastName'},
    ];

    return <CRUDTable
        search={usersCRUD.search}
        columns={columns}
        {...props}
    />
}
