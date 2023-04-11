import React, { useMemo, useState } from 'react';
import {Column, useTable} from 'react-table'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Iconify from '../../iconify/Iconify';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/reducers/userReducer';
import { UserData } from '../../../@types/user';

interface AdminTableProps {
    columns: Column<any>[],
    query: any,
    onClickDetailsButton?: (id: number) => void,
    onClickEditButton?: (id: number) => void,
    onClickDeleteButton?: (id: number) => void,
    Button?: React.ReactNode;
    user?: UserData
}

const AdminTable = ({
                        columns,
                        query,
                        Button,
                      user,
                      onClickDetailsButton,
                      onClickEditButton,
                      onClickDeleteButton
                    }: AdminTableProps) => {
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState<number>(0);
    const [take, setTake] = useState<number>(10);
    const {data: dataServer} = query({paging: {skip: skip, take: take}})

    const data = React.useMemo(() => {
        if (dataServer) {
            setTotal(dataServer.count);
            return dataServer.rows
        } else {
            setTotal(0)
            return null
        }
    }, [dataServer])

  const _columns = useMemo(() => {
    if (onClickDeleteButton || onClickDetailsButton || onClickEditButton) {
      if (!columns.find(el => el.accessor == 'actions')) {
        columns.push({
          Header: 'Действия',
          accessor: 'actions',
          disableSortBy: true,
          Cell: ({row}) => {
            if (row.original.id === user?.id) {
              return null
            }
            return <Box sx={{display: 'flex', columnGap: '5px'}}>
              {onClickDetailsButton &&
              <Iconify onClick={() => onClickDetailsButton(row.original.id)} icon={'clarity:details-line'} style={{ fontSize: '1.5rem', cursor: 'pointer' }} />}
              {onClickEditButton && <Iconify onClick={() => onClickEditButton(row.original.id)} icon={'material-symbols:edit-document-sharp'}
                                             style={{ fontSize: '1.5rem', cursor: 'pointer' }} />}
              {onClickDeleteButton &&
              <Iconify onClick={() => onClickDeleteButton(row.original.id)} icon={'material-symbols:delete-forever-rounded'} style={{ fontSize: '1.5rem', cursor: 'pointer' }} />}
            </Box>
          }
        })
      }
    }

    return columns;
  }, [columns, onClickDeleteButton, onClickEditButton, onClickDetailsButton, user]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns: _columns, data: data ? data : []})

    return (
            <Box>
              {Button ? Button : null}
              <TableContainer component={Paper}>
                    <Table {...getTableProps()} aria-label="simple table">
                        <TableHead>
                                {headerGroups.map((hG, idx) => (
                                  <TableRow {...hG.getHeaderGroupProps()} key={idx}
                                      className="border-solid border-b-[2px] border-black-5% ">
                                      {hG.headers.map((col, idx) => (
                                        <TableCell key={idx} align="left">
                                            {col.render('Header')}{' '}
                                        </TableCell>
                                      ))}
                                  </TableRow>
                                ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, idx) => {
                                prepareRow(row)

                                return (
                                  <TableRow  {...row.getRowProps()} key={idx}>
                                      {row.cells.map((cell, idx) => (
                                        <TableCell {...cell.getCellProps()} key={idx}>{cell.render('Cell')}</TableCell>
                                      ))}
                                  </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100, 500, 1000]}
                    labelRowsPerPage={"Количество записей на странице"}
                    style={{alignItems: "center"}}
                    component="div"
                    count={total}
                    rowsPerPage={take}
                    page={skip / take}
                    onPageChange={(e, page) => {
                      setSkip(page * take);
                    }}
                    onRowsPerPageChange={(event) => {
                      setSkip(0);
                      setTake(+event.target.value);
                    }}
                  />
                </TableContainer>
            </Box>
    );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(AdminTable);
