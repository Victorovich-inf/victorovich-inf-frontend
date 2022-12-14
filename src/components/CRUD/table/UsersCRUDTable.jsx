import CRUDTable from '../CRUDTable';
import React from 'react';
import { usersCRUD } from '../../../http';

export default function UsersCRUDTable({ ...props }) {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Логин', dataIndex: 'name', key: 'name' },
    { title: 'Имя', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Фамилия', dataIndex: 'lastName', key: 'lastName' },
    {
      title: "Город",
      key: 'city',
      render: (unknown, row) => row.city ? row.city?.name :
        <span style={{color: "gray"}}>Не задан</span>
    },
  ];

  const searchFields = [
    {
      title: 'Логин',
      key: 'name',
      compareType: 'like',
      filterType: 'normal',
    },
    {
      title: 'Город',
      key: 'city_name',
      compareType: 'like',
      filterType: 'normal',
    },
  ];

  return <CRUDTable

    search={usersCRUD.search}
    columns={columns} searchFields={searchFields}
    {...props}
  />;
}
