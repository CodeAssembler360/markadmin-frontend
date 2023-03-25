import React, { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "./Columns";
import { GlobalFilter } from "./GlobalFilter";
import "./filtering.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getChocolateOrderAction } from "../../../../../store/actions/OrderAction";
import { getContactsAction } from "../../../../../store/actions/CustomerAction";

export const ChocolateList = () => {
  const dispatch = useDispatch();
  const history = useHistory("");
  const columns = useMemo(() => COLUMNS, []);
  const[data,setData]=useState([])
  const { order } = useSelector((state) => state.orders);
  const { contact } = useSelector((state) => state.contacts);
  useEffect(async () => dispatch(getChocolateOrderAction()), []);
  useEffect(async () => dispatch(getContactsAction()), []);
  useEffect(async () =>
  setData(contact.filter((x,index)=>
  order.find((y)=>y.ContactName._id==x._id)
  )), [contact]);
  const tableInstance = useTable(
    {
      columns,
      data: data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;
  const clickHandler = (data) => {
    history.push(`/ecom-chocolateOrders/${data}`);
  };

  return (
    <>
      <PageTitle activeMenu="ProductList" motherMenu="Shop" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Table Filtering</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table
              {...getTableProps()}
              className="table filtering-table table-responsive-lg d-content"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="">
                {page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{ scrollBehavior: "smooth" }}
                            className="cursor-pointer"
                            onClick={() => clickHandler(row.original._id)}
                          >
                            {
                            cell.render("Cell")
                            }
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
                {""}
              </span>
              <span className="table-index">
                Go to page :{" "}
                <input
                  type="number"
                  className="ml-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>
            </div>
            <div className="text-center">
              <div className="filter-pagination  mt-3">
                <button
                  className=" previous-button"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {"<<"}
                </button>

                <button
                  className="previous-button"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
                <button
                  id="section2"
                  className=" next-button"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChocolateList;
