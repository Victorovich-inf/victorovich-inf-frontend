import CRUDTable from '../CRUDTable';
import React from 'react';
import { certificatesCRUD, ordersCRUD } from '../../../http';

export default function CertificatesCRUDTable({ ...props }) {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Номер сертификата', dataIndex: 'number', key: 'number' },
    { title: 'Код сертификата', dataIndex: 'code', key: 'code' },
    { title: 'Баланс', dataIndex: 'balance', key: 'balance' },
    { title: 'Дата покупки', dataIndex: 'dateBuy', key: 'dateBuy' },
    { title: 'Дата окончания', dataIndex: 'dateEnd', key: 'dateEnd' },
  ];

  return <CRUDTable
    search={certificatesCRUD.search}
    columns={columns}
    {...props}
  />;
}
