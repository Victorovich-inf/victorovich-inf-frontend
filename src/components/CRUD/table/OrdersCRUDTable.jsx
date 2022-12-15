import CRUDTable from '../CRUDTable';
import React from 'react';
import { ordersCRUD } from '../../../http';

export default function OrdersCRUDTable({ ...props }) {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Номер', dataIndex: 'number', key: 'number' },
    { title: 'Дата заказа', dataIndex: 'dateOfOrder', key: 'dateOfOrder' },
    { title: 'Дата посещения', dataIndex: 'dateOfVisit', key: 'dateOfVisit' },
    {
      title: "Город",
      key: 'city',
      render: (unknown, row) => row.city ? row.city?.name :
        <span style={{color: "gray"}}>Не задан</span>
    },
  ];

  return <CRUDTable
    search={ordersCRUD.search}
    columns={columns}
    {...props}
  />;
}
