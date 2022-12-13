import useLoader from '../../hooks/useLoader';
import { Button, Grid } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { Table } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CRUDFilter from './CRUDFilter';
import CollapsibleCRUDTable from './CollapsibleCRUDTable';
import CRUDTableContext from './CRUDTableContext';

import Iconify from '../iconify';


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
              <>
                {onClickDetailsButton && <Iconify icon={'clarity:details-line'} style={{ fontSize: '1.5rem', marginRight: '20px' }}
                                                         onClick={() => onClickDetailsButton(record.id)} />}
                {onClickEditButton && <Iconify icon={'material-symbols:edit-document-sharp'} style={{ fontSize: '1.5rem', marginRight: '20px' }}
                                                onClick={() => onClickEditButton(record.id)} />}
                {onClickDeleteButton &&
                  <Iconify icon={'material-symbols:delete-forever-rounded'} style={{ fontSize: '1.5rem' }} onClick={() => onClickDeleteButton(record.id)} />}
              </>
            );
          },
        });
      }
      ;
    }

    return result;
  }, [columns, extraActions, onClickDeleteButton, onClickEditButton, onClickDetailsButton]);

  const [data, setData] = useState([]);
  const Context = CRUDTableContext;

  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(pagination ? 10 : null);

  const { loading, start, stop } = useLoader(true);
  const paging = useMemo(
    () => ({ take, skip, returnCount: true }),
    [take, skip],
  );
  const [sort] = useState({ id: { operator: 'desc' } });
  const [filter, setFilter] = useState({});
  const [searchValue, setSearchValue] = useState({});
  const [advancedSearchValue, setAdvancedSearchValue] = useState({});
  const fetch = useCallback(async (reloadExtraFilter) => {
    start();
    extraQuery = extraQuery || {};
    if (typeof search === 'function') {
      search({ paging, sort, filter: { ...filter, ...(reloadExtraFilter || extraFilter || {}) }, ...extraQuery })
        .then(async (data) => {
          if (mapData)
            data.result = mapData(data.result);
          if (onData) {
            await onData(data.result);
          }
          if (onResult) {
            await onResult(data);
          }
          setData(data.result);
          setTotal(data.total);
        })
        .catch(alert)
        .finally(stop);
    } else {
      if (mapData && search?.result)
        search.result = mapData(search.result);
      if (onData) {
        await onData(search?.result);
      }

      setData(search?.result);
      setTotal(search?.total);
      stop();
    }
  }, [paging, filter, extraFilter, sort, start, stop, search]);
  useEffect(() => {
    if (wait)
      return;

    fetch(extraFilter);
  }, [skip, take, paging, filter, extraFilter, search, reloadValue, wait]);


  const handleSearchPanelChange = (val, key, compareType, operandPosition, filterType, key1, key2) => {
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
            filter[key2] = {
              ...filter[key2],
              operator: compareType,
              [`operand${operandPosition}`]: val,
            };
            stateObject[key1 || key] = filter;
          } else {
            stateObject[key1 || key] = {
              ...state[key1 || key],
              operator: compareType,
              [`operand${operandPosition}`]: val,
            };
          }
          if (!val) {
            delete stateObject[key1 || key][`operand${operandPosition}`];
            if (!stateObject[key1 || key].operand1 && !stateObject[key1 || key].operand2) {
              stateObject[key1 || key] = null;
            }
          }
          return stateObject;
        });
        break;
      case 'advanced':
        setAdvancedSearchValue(state => {
          const stateObject = {
            ...state,
            [key]: val,
          };
          if (!val) {
            stateObject[key] = null;
          }
          return stateObject;
        });
        break;

    }


  };
  const applyFilter = () => {
    setSkip(0);

    setFilter(state => {
      return {
        ...searchValue,
      };
    });
  };
  const removeFilter = () => {
    setSearchValue({});
    setAdvancedSearchValue({});
    setFilter({});

    onDidRemoveFilter && onDidRemoveFilter();
  };
  return (
    <>{
      (searchFields || filterFields) && <CRUDFilter rightChildren={
        onClickCreateButton && <Button onClick={onClickCreateButton}>Добавить</Button>
      }>
        <Grid container xs={12} marginBottom={2} justifyContent={'space-between'}>
          <Grid container xs={10}>
            <Button onClick={() => applyFilter()}>
              Найти
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={() => removeFilter()}>
              Сбросить фильтры
            </Button>
          </Grid>
        </Grid>
      </CRUDFilter>
    }
      {collapsibleTable ?
        <Context.Provider value={{
          CollapseCRUDTable: CollapseCRUDTable,
          onRowClick: onRowClick,
          reducerFilterKey: reducerFilterKey,
          reducerParentKey: reducerParentKey,
          columns: _columns,
          rows: data,
          collapsedTableTitle: collapsedTableTitle,
        }}>
          <CollapsibleCRUDTable otherColumns={otherColumns} {...props} />
        </Context.Provider>

        :
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
      }


      {pagination && <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100, 500, 1000]}
        labelRowsPerPage={'Количество записей на странице'}
        style={{ alignItems: 'center' }}
        component='div'
        count={total}
        rowsPerPage={take}
        page={skip / take}
        onPageChange={(e, page) => {
          setSkip(page * take);
        }}
        onRowsPerPageChange={(event) => {
          setSkip(0);
          setTake(event.target.value);
        }}
      />}

    </>
  );
};

CRUDTable.defaultProps = {
  rowKey: 'id',
  pagination: true,
};

export default CRUDTable;