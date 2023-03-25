import React, { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import "./filtering.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteChocolateOrderAction, editChocolateOrderByIdAction, getChocolateOrderAction } from "../../../../../store/actions/OrderAction";
import { Dropdown } from "react-bootstrap";
import { COLUMN } from "./Columns";

export const ChocolateOrder = () => {
  const dispatch = useDispatch();
  const params=useParams();
  const history = useHistory("");
  const columns = useMemo(() => COLUMN, []);
  const[data,setData]=useState([])
  const { order } = useSelector((state) => state.orders);
  useEffect(async () => dispatch(getChocolateOrderAction()), []);
  useEffect(async () =>{
    let arr=order.filter((x,index)=>x.ContactName._id==params.id);
    if(arr.length>0){
        setData(arr.map((x)=>x._id!==""?{...x,ContactName:x.ContactName.ContactName}:x))

    }
    else{
        history.push('/ecom-chocolateOrders')
    }},[order]);  const tableInstance = useTable(
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

  const deleteHandler = (data) => {
    dispatch(deleteChocolateOrderAction(data));
  };
  const clickHandler = (data) => {
    history.push(`/ecom-chocolateOrders/${params.id}/${data}`);
  };
  const changeHandler=(data,value)=>{
    const val={
      ...data,
      status:value
    };
    dispatch(editChocolateOrderByIdAction(val,order))

  }
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
                    <th>Action</th>
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
                              cell.column.Header=="Status"&&cell.value=="Completed"? <span className="badge badge-success">
                              Completed
                              <span className="ml-1 fa fa-check" />
                            </span>:cell.column.Header=="Status"&&cell.value=="Pending"?<span className="badge badge-warning">
                          Pending
                          <span className="ml-1 fas fa-stream" />
                        </span>:cell.render("Cell")
                            }
                          </td>
                        );
                      })}
                      <td className="py-2 text-center">
                      <Dropdown className="dropdown text-sans-serif">
                          <Dropdown.Toggle
                            variant=""
                            className="btn btn-primary i-false tp-btn-light sharp"
                            type="button"
                            id="order-dropdown-0"
                           
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth={1}
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x={0} y={0} width={24} height={24} />
                                  <circle fill="#000000" cx={5} cy={12} r={2} />
                                  <circle
                                    fill="#000000"
                                    cx={12}
                                    cy={12}
                                    r={2}
                                  />
                                  <circle
                                    fill="#000000"
                                    cx={19}
                                    cy={12}
                                    r={2}
                                  />
                                </g>
                              </svg>
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="dropdown-menu dropdown-menu-right border py-0 cursor-pointer"
                            aria-labelledby="order-dropdown-0"

                          >
                            <div className="py-2">
                              <div
                                className="dropdown-item"
                                onClick={()=>changeHandler(row.original,"Completed")}
                              >
                                Completed
                              </div>
                              <div
                                className="dropdown-item"
                                onClick={()=>changeHandler(row.original,"Pending")}
                              >
                                Pending
                              </div>
                              <div className="dropdown-divider" />
                              <div
                                className="dropdown-item text-danger"
                                onClick={() => deleteHandler(row.original)}
                              >
                                Delete
                              </div>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
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
export default ChocolateOrder;
