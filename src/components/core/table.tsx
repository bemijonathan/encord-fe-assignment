import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Column, RowData } from "../../types";
import { Box, Typography } from "@mui/material";
import { Accessibility } from "@mui/icons-material";

type CustomTableProps = {
  columns: Column[];
  rows: RowData[];
};

export const CustomTable = ({ columns, rows }: CustomTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align || "left"}
                sx={{ p: 2 }}
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell
                  key={`${rowIndex}-${column.key}`}
                  align={column.align || "left"}
                >
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!rows.length && (
        <Box sx={{ p: 2 }} textAlign="center">
          <Accessibility />
          <Typography variant="h6">No Data</Typography>
        </Box>
      )}
    </TableContainer>
  );
};
