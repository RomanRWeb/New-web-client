"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../styles/common/CustomTable.scss";
import { ColumnsHeader, TableProps } from "@app/data/types";
import { TriangleUpIcon } from "@app/common/icons/triangle-up";
import { TriangleDownIcon } from "@app/common/icons/triangle-down";
import { TriangleUpDownIcon } from "@app/common/icons/triangle-up-down";

interface SortType {
  field: string;
  sort: "asc" | "desc";
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
const CustomTable: React.FC<TableProps<any>> = ({
  columns,
  data,
  name,
  defaultSortField = "id",
  onClickRow,
}) => {
  const maxIdCharCount: string = useMemo(() => {
    if (data.length > 0) {
      const tryCalcIdWidth: number = data.sort((a, b) => b.id - a.id)[0][
        columns[0].name
      ].length;
      if (tryCalcIdWidth < 3) {
        return "50px";
      } else return `calc(${tryCalcIdWidth} * 8px + 25px)`;
    } else return "";
  }, [columns, data]);

  const [tableData, setTableData] = useState<typeof data>([]);
  const [sort, setSort] = useState<SortType>(
    defaultSortField === ""
      ? { field: defaultSortField, sort: "desc" }
      : { field: "", sort: "desc" },
  );

  useEffect(() => {
    if (sort.field !== "") {
      const newData = data.sort((a, b) => {
        if (sort.sort === "desc") {
          if (Number(a[sort.field])) {
            return a[sort.field] - b[sort.field];
          } else return a[sort.field] > b[sort.field] ? 1 : -1;
        } else if (Number(a[sort.field])) {
          return b[sort.field] - a[sort.field];
        } else return a[sort.field] < b[sort.field] ? 1 : -1;
      });
      setTableData([...newData]);
      console.log(newData);
    } else {
      setTableData(data);
    }
  }, [data, sort]);

  const handleColumnHeaderClick = useCallback(
    (columnName: string) => {
      if (sort.field === columnName) {
        if (sort.sort === "desc") {
          setSort({ field: columnName, sort: "asc" });
        } else {
          setSort({ field: "", sort: "desc" });
        }
      } else setSort({ field: columnName, sort: "desc" });
    },
    [sort.field, sort.sort],
  );

  const createColumnsHeaders = useMemo(() => {
    return columns.map((columnHeader, i) => (
      <th
        key={columnHeader.name}
        style={{ width: i === 0 ? maxIdCharCount : "auto" }}
        onClick={() => handleColumnHeaderClick(columnHeader.name)}
      >
        <div className={"column-header"}>
          <span>{columnHeader.text}</span>
          {columnHeader.name === sort.field ? (
            sort.sort === "asc" ? (
              <TriangleDownIcon />
            ) : (
              <TriangleUpIcon />
            )
          ) : (
            <TriangleUpDownIcon />
          )}
        </div>
      </th>
    ));
  }, [columns, handleColumnHeaderClick, maxIdCharCount, sort.field, sort.sort]);

  const findColor = useCallback(
    ({ col, item }: { col: ColumnsHeader; item: any }) => {
      if (col.colored && col.colorTable) {
        return col.colorTable.find(
          (el) =>
            el.value ===
            item[col.name].replace(/\s\d{2}.\d{2}.\d{4}$/, "").trim(),
        )?.color;
      } else return "inherit";
    },
    [],
  );

  return (
    <div className={"table"}>
      {name ? <h1>{name}</h1> : null}
      <table>
        <thead>
          <tr>{createColumnsHeaders}</tr>
        </thead>
        <tbody>
          {tableData.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => (onClickRow ? onClickRow(item) : null)}
            >
              {columns.map((col) => (
                <td
                  key={col.name}
                  style={{ color: findColor({ col: col, item: item }) }}
                >
                  {item[col.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 ? (
        <span>{"Нет элементов удовлетворяющих условиям поиска"}</span>
      ) : null}
    </div>
  );
};

export default CustomTable;
