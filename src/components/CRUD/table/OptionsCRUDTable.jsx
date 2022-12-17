import CRUDTable from '../CRUDTable';
import React from 'react';
import { optionsCRUD } from '../../../http';

export default function OptionsCRUDTable({ ...props }) {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'optionsName', key: 'optionsName' },
    { title: 'Кол-во чел. от', dataIndex: 'optionsCount1', key: 'optionsCount1' },
    { title: 'Кол-во чел. дом', dataIndex: 'optionsCount2', key: 'optionsCount2' },
    { title: 'Длительность', dataIndex: 'duration', key: 'duration', editable: true },
    { title: 'Цена', dataIndex: 'optionsNewPrice', key: 'optionsNewPrice', editable: true },
  ];

  return <CRUDTable
    search={optionsCRUD.search}
    columns={columns}
    {...props}
  />;
}
