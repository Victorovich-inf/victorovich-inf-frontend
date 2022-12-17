import useLoader from '../../hooks/useLoader';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { Pagination, Table } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Iconify from '../iconify';
import TableToolbar from './TableToolbar';


const CRUDTable = ({
                     extraFilter,
                     searchPlaceholder,
                     search,
                     searchByIdHide,
                     columns,
                     onClickDetailsButton,
                     rowClassNameHandler,
                     onClickEditButton,
                     onClickDeleteButton,
                     onClickCreateButton,
                     detailsVisibleFunc,
                     editVisibleFunc,
                     deleteVisibleFunc,
                     extraActions,
                     reloadValue,
                     rowKey,
                     searchByOperator,
                     extraHeader,
                     filterFields,
                     onRowClick,
                     CollapseCRUDTable,
                     searchFields,
                     sendFilterValues,
                     searchBy,
                     pagination,
                     otherColumns,
                     collapsibleTable,
                     collapsedTableTitle,
                     reducerFilterKey,
                     reducerParentKey,
                     disableCreateButton,
                     onResult,
                     onData,
                     mapData,
                     extraQuery,
                     onDidRemoveFilter,
                     wait,
                     ...props
                   }) => {

  const _columns = useMemo(() => {
    const result = columns.filter(_ => !_.hidden);

    if (extraActions)
      for (let i = 0; i < extraActions.length; i++)
        result.push(extraActions[i]);

    if (onClickDetailsButton || onClickEditButton || onClickDeleteButton) {
      if (!result.find(el => el.key === 'actions')) {
        result.push({
          title: 'Действия',
          key: 'actions',
          fixed: 'right',
          width: 100,
          render: (_, record) => {
            return (
              <Box sx={{display: 'flex'}}>
                {onClickDetailsButton &&
                  <Iconify icon={'clarity:details-line'} style={{ fontSize: '1.5rem', marginRight: '20px', cursor: 'pointer' }}
                           onClick={() => onClickDetailsButton(record.id)} />}
                {onClickEditButton && <Iconify icon={'material-symbols:edit-document-sharp'}
                                               style={{ fontSize: '1.5rem', marginRight: '20px', cursor: 'pointer' }}
                                               onClick={() => onClickEditButton(record.id)} />}
                {onClickDeleteButton &&
                  <Iconify icon={'material-symbols:delete-forever-rounded'} style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                           onClick={() => onClickDeleteButton(record.id)} />}
              </Box>
            );
          },
        });
      }
      ;
    }

    return result;
  }, [columns, extraActions, onClickDeleteButton, onClickEditButton, onClickDetailsButton]);

  const [data, setData] = useState([]);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [total, setTotal] = useState(0);

  const { loading, start, stop } = useLoader(true);
  const [sort] = useState({ id: { operator: 'desc' } });
  const [filter, setFilter] = useState({});
  const [searchValue, setSearchValue] = useState({});

  const fetch = useCallback(async (reloadExtraFilter) => {
    start();
    extraQuery = extraQuery || {};
    if (typeof search === 'function') {
      search({
        page: pageNumber,
        sort,
        filter: { ...filter, ...(reloadExtraFilter || extraFilter || {}) }, ...extraQuery,
      })
        .then(async (data) => {
          setData(data.result);
          setTotal(data.total);
        })
        .catch(alert)
        .finally(stop);
    } else {

      setData(search?.result);
      setTotal(search?.total);
      stop();
    }
  }, [pageNumber, filter, extraFilter, sort, start, stop, search]);
  useEffect(() => {

    fetch(extraFilter);
  }, [pageNumber, filter, extraFilter, search, reloadValue, wait]);


  const handleSearchPanelChange = (val, key, compareType, filterType, key1, key2) => {
    switch (filterType) {
      case 'normal':
      case 'text':
        setSearchValue(state => {
          let filter = state[key1 || key];

          const stateObject = {
            ...state,
          };

          if (key2) {
            if (!filter) {
              filter = {};
            }
            filter[key2] = val;
            stateObject[key1 || key] = filter;
          } else {
            stateObject[key1 || key] = val;
          }
          if (!val) {
            delete stateObject[key1 || key];
            if (!stateObject[key1 || key]) {
              stateObject[key1 || key] = null;
            }
          }
          return stateObject;
        });
        break;
    }


  };

  const applyFilter = () => {
    setPageNumber(1);

    setFilter(state => {
      return {
        ...searchValue,
      };
    });
  };

  const removeFilter = () => {
    setSearchValue({});
    setFilter({});

    onDidRemoveFilter && onDidRemoveFilter();
  };

  return (
    <>
      {onClickCreateButton && <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, px: 1 }}>
        <Button variant='outlined' onClick={onClickCreateButton}>Добавить</Button>
      </Box>}
      <TableToolbar searchPlaceholder={'Фильтры'} filters={searchFields?.length}>
        <Stack direction='row' flexWrap='wrap' spacing={2} sx={{ py: 1.5, px: 1 }}>
          {searchFields && searchFields.map((field, idx) => (
            <Grid key={idx} style={{
              marginLeft: '10px',
              minWidth: 200,
              marginBottom: '10px',
            }} item>
              <TextField
                type='text'
                label={field.title}
                size='small'
                value={(() => {
                  switch (field.filterType) {
                    case 'normal':
                      return searchValue[field.key] || '';
                  }
                })()}
                style={{
                  width: 'auto',
                }}
                onChange={(ev) => handleSearchPanelChange(ev.target.value, field.key, field.compareType, field.filterType)}
              />
            </Grid>
          ))}
        </Stack>
        <Grid sx={{ paddingLeft: 2 }}
              container item xs={12} marginBottom={2} justifyContent={'space-between'}>
          <Grid container item xs={10}>
            <Button variant='contained' onClick={() => applyFilter()}>
              Поиск
            </Button>
            <Button variant='contained' style={{ marginLeft: '10px' }} onClick={() => removeFilter()}>
              Сброс
            </Button>
          </Grid>
        </Grid>
      </TableToolbar>
      <Table
        columns={_columns}
        rowKey={rowKey}
        dataSource={data}
        loading={loading}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              if (e.target?.id !== 'deleteReferal')
                onRowClick && onRowClick(record, rowIndex);
            }, // click row
            onDoubleClick: (event) => {
            }, // double click row
            onContextMenu: (event) => {
            }, // right button click row
            onMouseEnter: (event) => {
            }, // mouse enter row
            onMouseLeave: (event) => {
            }, // mouse leave row
          };
        }}
        rowClassName={rowClassNameHandler && rowClassNameHandler}
        {...props}
      />

      {pagination && <Pagination pageSize={10} onChange={(page) => {
        setPageNumber(page);
      }} defaultCurrent={1} style={{
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
                                 current={pageNumber} total={total} />}
    </>
  );
};

CRUDTable.defaultProps = {
  rowKey: 'id',
  pagination: true,
};

export default CRUDTable;