import React, { Fragment, useEffect, useMemo, useState } from "react";
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
import {
  deleteProductsAction,
  getProductsAction,
} from "../../../../../store/actions/ProductAction";
import { useHistory } from "react-router-dom";

export const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory("");
  const columns = useMemo(() => COLUMNS, []);
  const { product } = useSelector((state) => state.products);
  useEffect(async () => dispatch(getProductsAction()), []);
  const tableInstance = useTable(
    {
      columns,
      data: product,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
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

  const deleteHandler = (data) => {
    dispatch(deleteProductsAction(data));
  };
  const clickHandler = (data) => {
    history.push(`/product-detail/${data}`);
  };

  return (
    <>
      <PageTitle activeMenu="ProductList" motherMenu="Shop" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Table Filtering</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive d-content">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table
              {...getTableProps()}
              className="table filtering-table table-responsive-lg"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        {column.canFilter ? column.render("Filter") : null}
                      </th>
                    ))}
                    <th style={{ paddingBottom: "66px" }}>Action</th>
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
                            className="cursor-pointer"
                            onClick={() => clickHandler(row.original._id)}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                      <td>
                        <Fragment>
                          <div className="d-flex justify-content-center">
                            <div
                              onClick={() => deleteHandler(row.original)}
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </div>
                          </div>
                        </Fragment>
                      </td>
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
export default ProductList;
