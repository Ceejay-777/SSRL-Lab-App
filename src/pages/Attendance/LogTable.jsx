import React, { useMemo } from "react";
import { useTable } from "react-table";
import { header } from "./header";
import SampleData from "./SampleData.json";


const LogTable = () => {
    const headerData = useMemo(() => header, [])
    const sdata = useMemo(() => SampleData, []);

  const tableInstance = useTable({ columns: headerData, data: sdata });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                    console.log(cell.render('Cell'))
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default LogTable;
