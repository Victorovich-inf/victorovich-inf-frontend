import React, { useEffect, useState } from "react";

import {
    Button,
    Checkbox,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { sortRows } from '../utils/data';

export const BasicTable = ({
                               cells,
                               rows,
                               order,
                               orderBy,
                               size,
                               disabled,
                               selected,
                               setSelected,
                               emptyPlaceholder,
                               button: ButtonComponent,
                               addButtonText,
                               onAddButtonClick,
                           }) => {
    const [selecting, setSelecting] = useState(false);

    const isSelected = (row) =>
        selected?.filter(({ id }) => id === row.id)?.length > 0 || false;

    const handleSelectAll = (e) => {
        return e.target.checked ? setSelected(rows) : setSelected([]);
    };

    const handleSelect = (e, row) => {
        return isSelected(row)
            ? setSelected([...(selected?.filter(({ id }) => id !== row.id) || [])])
            : setSelected([...(selected || []), row]);
    };

    const isEmpty = (value) => value === null || value === undefined;
    const isObject = (value) => typeof value === "object";

    useEffect(() => {
        setSelecting(selected ? true : false);
    }, []);

    return (
        <Grid container>
            {rows?.length ? (
                <TableContainer component={Paper} style={{ margin: "12px auto" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="">
                            <TableHead style={{ background: "#FAFBFB" }}>
                                <TableRow>
                                    {selecting && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                // indeterminate={numSelected > 0 && numSelected < rowCount}
                                                // checked={rowCount > 0 && numSelected === rowCount}
                                                onChange={handleSelectAll}
                                            />
                                        </TableCell>
                                    )}
                                    {cells?.map((cell, key) => (
                                        <TableCell sx={{
                                            padding: '8px'
                                        }} key={key} align="left">
                                            {cell?.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortRows(rows, order, orderBy)?.map(
                                    (row, key) =>
                                        row && (
                                            <TableRow key={key} selected={isSelected(row)}>
                                                {selecting && (
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isSelected(row)}
                                                            onClick={(e) => handleSelect(e, row)}
                                                        />
                                                    </TableCell>
                                                )}
                                                {cells?.map((cell, key) => (
                                                    <TableCell sx={{
                                                        padding: '8px'
                                                    }} size={size} key={key} align="left">
                                                        {cell?.render ? (
                                                            !isEmpty(cell.render(row)) ? (
                                                                cell.render(row)
                                                            ) : (
                                                                "-"
                                                            )
                                                        ) : !isEmpty(row[cell?.id]) ? (
                                                            !isObject(row[cell.id]) ? (
                                                                row[cell.id]
                                                            ) : (
                                                                <></>
                                                            )
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        )
                                )}
                            </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography
                    component="span"
                    variant="h6"
                    style={{
                        fontWeight: 300,
                        color: "#8B8799",
                        fontSize: "16px",
                        margin: "10px 0px",
                    }}
                >
                    {emptyPlaceholder}
                </Typography>
            )}
            {!disabled && (
                <Grid item xs={12}>
                    {ButtonComponent ? (
                        ButtonComponent
                    ) : (
                        <Button onClick={onAddButtonClick}>{addButtonText}</Button>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

BasicTable.defaultProps = {
    emptyPlaceholder: "Нет данных",
    order: "desc",
    orderBy: "id",
    size: "medium",
    disabled: false,
    // selected: [],
    // setSelected: () => {},
    addButtonText: "Добавить",
    onAddButtonClick: (e) => {},
};
