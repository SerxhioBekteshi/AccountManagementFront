import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  List,
  ListInlineItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table as BootstrapTable,
} from "reactstrap";
import moment from "moment";
import stringManager from "../../utils/stringManager";
import eColumnType from "../../../main/assets/enums/table/eColumnType";
import StringManager from "../../utils/stringManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eFormMode from "../../assets/enums/eFormMode";

const Table = (props: any) => {
  const { onIconClick, handleAddRow, idBasedFetch, controller, data } = props;

  const [result, setResult] = useState<any>([]);
  const [searchTerm, setSearchTem] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(3);
  const [orderBy, setOrderBy] = useState<any>("");
  // const [field, setFields] = useState<any>("");
  const [columns, setColumns] = useState<any>([]);
  const [rows, setRows] = useState<any>("");
  const [rowKey, setRowKey] = useState<any>("");
  const [totalCount, setTotalCount] = useState<any>(0);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const fetchData = async () => {
    let response;
    if (controller) {
      response = await (
        await axios.post(`/${controller}/get-all`, {
          searchTerm: searchTerm,
          pageNumber: currentPage,
          pageSize: pageSize,
          sorting: [],
        })
      ).data;
    }
    setColumns(response.data.columns);
    setRowKey(StringManager.CamelCase(response.data.key));
    setRows(response.data.rows);
    setResult(response.data);
    setCurrentPage(response.data.currentPage);
    setPageSize(response.data.pageSize);
    setTotalCount(response.data.totalCount);
    setHasPrevious(response.data.hasPrevious);
    setHasNext(response.data.hasNext);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, pageSize, currentPage, controller]);

  useEffect(() => {
    document.addEventListener(`refreshTable${controller}`, fetchData);
    return () => {
      document.removeEventListener(`refreshTable${controller}`, fetchData);
    };
  }, [controller]);

  const handleChangePageSize = (value: string) => {
    setPageSize(value);
  };

  const renderNoRowsFound = () => {
    return (
      <div className="p-3" style={{ display: "table-caption" }}>
        <Alert className="w-100 mb-0" color="warning text-center">
          There is no data to display
        </Alert>
      </div>
    );
  };

  const getCellClassName = (column: any) => {
    let className = "table-cell-ellipsis ";
    switch (column.propertyType) {
      case eColumnType.Number:
      case eColumnType.Decimal:
        className += "text-align-right";
        break;
      case eColumnType.Actions:
        className += "text-align-center icons-sticky";
        break;
    }
    return className;
  };

  const renderActionIcons = (column: any, row: any) => {
    let dataTableIcons = column.dataTableIcons;
    return (
      <div className="d-flex justify-content-end gap-3">
        {dataTableIcons.map((action: any, index: number) => {
          let target = `icon_${row[rowKey]}_${action.name}`.replace(/\s/g, "");
          if (
            row.managerAccountActivated == "Registered" &&
            action.name === eFormMode.Insert
          ) {
            return "";
          } else {
            return (
              <div key={target}>
                <FontAwesomeIcon
                  style={{
                    cursor: "pointer",
                  }}
                  color={action.color}
                  icon={action.icon as any}
                  onClick={(event: any) => {
                    event.stopPropagation();
                    onIconClick && onIconClick(row[rowKey], action.name); //vjen nga BackEnd
                  }}
                  id={target}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

  const renderCellValue = (row: any, column: any) => {
    const propName = stringManager.CamelCase(column.headerName);
    const cellValue = row[propName];

    if (cellValue == null && column.propertyType !== eColumnType.Actions) {
      return "";
    } else {
      switch (column.propertyType) {
        case eColumnType.String:
          return cellValue;
        case eColumnType.DateTime:
          return moment(cellValue).format("DD MMMM YYYY");
        case eColumnType.Number:
        case eColumnType.Decimal:
          return cellValue;
        case eColumnType.Boolean:
          return <Input type="checkbox" disabled checked={cellValue} />;
        case eColumnType.Actions:
          return renderActionIcons(column, row);
      }
    }
  };

  // const renderPageNumber = () => {
  //   let pageNumbers = [];

  //   for (let i = 1; i <= totalCount; i++)
  //   {
  //     pageNumbers.push(
  //       <PaginationItem key={i} active={currentPage === i ? true : false}>
  //         <PaginationLink onClick={(e) => setCurrentPage(i)}>
  //           {i}
  //         </PaginationLink>
  //       </PaginationItem>
  //     );
  //   }
  //   return pageNumbers;
  // };

  const renderColumn = (column: any, index: number) => {
    if (column.hide) {
      return null;
    }

    let className = getColumnClasses(column);
    return (
      <th
        // onClick={() => handleOrderColumn(column)}
        key={`column-${column.propertyName}-${index}`}
        className={className}
      >
        <div className="d-flex justify-content-between gap-2">
          {column.description}
          {/* {renderColumnOrderIcon(column)} */}
        </div>
      </th>
    );
  };

  const getColumnClasses = (column: any) => {
    let className = "table-header-cell ";
    switch (column.propertyType) {
      case eColumnType.Decimal:
      case eColumnType.Number:
        className += "text-align-right ";
        break;
      case eColumnType.Actions:
        className += "action-icons ";
        break;
    }
    // const columnOrdered = sort.find(
    //     (x) => x.columnName === column.propertyName
    // );
    // if (columnOrdered) className += "active-column";
    return className;
  };

  return (
    <div
      style={{
        border: "1px solid lightgrey",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <div style={{ width: "30%" }}>
        {" "}
        <Input
          type="search"
          onChange={(e) => setSearchTem(e.target.value)}
          value={searchTerm}
          placeholder="Search..."
        />{" "}
      </div>
      <BootstrapTable hover responsive className="m-1">
        <thead>
          <tr>
            {columns.map((column: any, index: number) =>
              renderColumn(column, index)
            )}
          </tr>
        </thead>
        {rows.length > 0 ? (
          <tbody>
            {rows.map((row: any, index: number) => (
              <tr
                className="data-slice"
                key={`row-${row[rowKey]}-${index}`}
                //   onClick={() => {
                //     isMobile &&
                //       onIconClick &&
                //       onIconClick(row[rowKey], controller);
                //   }}
              >
                {columns
                  .filter((column: any) => !column.hide)
                  .map((column: any, index: number) => (
                    <td
                      key={`cell-${index}`}
                      className={getCellClassName(column)}
                    >
                      {renderCellValue(row, column)}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        ) : (
          renderNoRowsFound()
        )}
      </BootstrapTable>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <div>
          <Button onClick={() => handleAddRow()}> Add </Button>
        </div>
        <div>
          <Pagination style={{ margin: "unset" }}>
            <PaginationItem disabled={hasPrevious == false}>
              <PaginationLink
                onClick={(e) => setCurrentPage(currentPage - 1)}
                previous
                style={{ zIndex: "unset !important" }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>
            {/* {renderPageNumber()} */}
            <PaginationItem disabled={hasNext == false}>
              <PaginationLink
                onClick={(e) => setCurrentPage(currentPage + 1)}
                next
              />
            </PaginationItem>
          </Pagination>
        </div>
        <div style={{ width: "20%", fontSize: ".9375rem" }}>
          <Input
            type="select"
            value={pageSize}
            onChange={(e) => handleChangePageSize(e.target.value)}
          >
            <option value="3"> 3 </option>
            <option value="5"> 5 </option>
            <option value="10"> 10 </option>
          </Input>
        </div>
      </div>
    </div>
  );
};

export default Table;
