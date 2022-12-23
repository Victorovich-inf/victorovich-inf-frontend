import { useCallback, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const SimpleTable = ({ columns, data, leftWidth, defaultEmptyValue }) => {
  const _leftWidth = useMemo(() => leftWidth || "50%", [leftWidth]);
  const renderValue = useCallback(
    (column) => {
      const value = column.value || data[column.code];
      switch (column.type) {
        case "bool":
        case "boolean":
          return value ? "Да" : "Нет";
        default:
          return value;
      }
    },
    [data]
  );

  return (
    <Table>
      <TableBody>
        {columns.map((column, i) => {
          return (
            <TableRow key={i}>
              <TableCell
                variant={"head"}
                style={{
                  fontWeight: "bold",
                  padding: "2px 5px",
                  width: _leftWidth,
                }}
              >
                {column.label}
              </TableCell>
              <TableCell style={{ padding: "2px 5px" }}>
                {renderValue(column) || defaultEmptyValue}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

SimpleTable.defaultProps = {
  defaultEmptyValue: "",
};

export default SimpleTable;
