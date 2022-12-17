import CRUDTable from '../CRUDTable';
import React from 'react';
import { servicesCRUD, subServicesCRUD } from '../../../http';

export default function SubServiceCRUDTable({ ...props }) {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'URL', dataIndex: 'url', key: 'url', editable: true },
    { title: 'Длительность', dataIndex: 'duration', key: 'duration', editable: true },
    { title: 'Цена', dataIndex: 'newPrice', key: 'newPrice', editable: true },
  ];

  return <CRUDTable
    search={subServicesCRUD.search}
    columns={columns}
    {...props}
  />;
}
