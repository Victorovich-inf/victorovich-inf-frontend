
import React, {useContext} from "react";
import {Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../TableMUIStyle";
import CRUDTableContext from "./CRUDTableContext";

const CollapseRow = ({row,idx})=>{
    const {columns, collapsedTableTitle, CollapseCRUDTable,onRowClick,reducerFilterKey,reducerParentKey} = useContext(CRUDTableContext)
    const isObject = (value) => typeof value === "object";

    const [open, setOpen] = React.useState(false);
    return  (<React.Fragment>
        <TableRow style={{cursor:"pointer"}}  sx={{ '& > *': { borderBottom: 'unset' } }}>
            {columns.map(key=>{
                const value = row[key.dataIndex];
                return (
                    <TableCell onClick={()=>{
                        onRowClick(row,idx)
                    }} component="th" scope="row">
                        {key.render ?
                            key.render("",row) :
                            isObject(value) ? "[object]: " + JSON.stringify(value) : row[key.dataIndex]}
                    </TableCell>
                )
            })}
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse style={{ margin:"20px 0"}} in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                            {collapsedTableTitle}
                        </Typography>
                        {CollapseCRUDTable && <CollapseCRUDTable pagination={false} extraFilter={{
                            [reducerFilterKey]:{
                                operand1:row[reducerParentKey],
                                operator:"equals"
                            }
                        }}/>}
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>
);
}

const CollapsibleCRUDTable = ({otherColumns, ...props}) =>{
    const {columns, collapsedTableTitle,rows} = useContext(CRUDTableContext)
    return (
        <Table aria-label="collapsible table" {...props}>
            <TableHead>
                <StyledTableRow>
                    {columns.map((column,idx)=>{
                        return <StyledTableCell key={idx}
                                          align={idx !== 0 ? "center" : "left"}
                                          style={{ borderRight: "1px solid gray" }}>{column.title}</StyledTableCell>
                    })}
                </StyledTableRow>
                {otherColumns && Object.values(otherColumns).map((rows,idx)=>{
                    return <StyledTableRow>{rows.map((column, idx) => {
                        return <StyledTableCell key={idx}
                                             align={idx !== 0 ? "center" : "left"}
                                             style={{ borderRight: "1px solid gray" }}>{column.title}</StyledTableCell>})}
                    </StyledTableRow>
                })}
            </TableHead>
            <TableBody>
                {rows.map((row,idx) => (
                    <CollapseRow  idx={idx}  key={row.name} row={row}/>
                ))}
            </TableBody>
        </Table>
    )
}

export default CollapsibleCRUDTable
