import CRUDTable from '../CRUDTable';
import React from 'react';
import { servicesCRUD } from '../../../http';

export default function ServicesCRUDTable({ ...props }) {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Активная', dataIndex: 'active', key: 'active',       editable: true},
  ];

  return <CRUDTable
    search={servicesCRUD.search}
    columns={columns}
    {...props}
  />;
}
