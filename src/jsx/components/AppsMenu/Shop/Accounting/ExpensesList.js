import React, { useEffect, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Trash from "../../../../../images/Trash.svg";
import checkCircle from "../../../../../images/checkCircle.svg";
import Edit from "../../../../../images/Edit.svg";
import {
  deleteExpensesByIdAction,
  editExpensesByIdAction,
  getExpensesAction,
} from "../../../../../store/actions/ExpensesAction";

const ExpensesList = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { expensesList } = useSelector((state) => state.expense);
  useEffect(() => {
    dispatch(getExpensesAction());
  }, []);
  useEffect(() => {
    setData(expensesList);
  }, [expensesList]);
  const inputHandler = (e, itemIndex) => {
    if (e.target.name == "price") {
      let IndexFind = data.find((x, index) => index == itemIndex);
      console.log(IndexFind);
      if (IndexFind.quantity != "" && IndexFind.quantity_Type != "") {
        let result =
          IndexFind.quantity_Type == "kilogram"
            ? parseInt(e.target.value) / (IndexFind.quantity * 1000)
            : IndexFind.quantity_Type == "pound"
            ? parseInt(e.target.value) / (IndexFind.quantity * 453.6)
            : IndexFind.quantity_Type == "ounces"
            ? parseInt(e.target.value) / (IndexFind.quantity * 28.35)
            : IndexFind.quantity_Type == "milligram"
            ? parseInt(e.target.value) / (IndexFind.quantity * 0.001)
            : IndexFind.quantity_Type == "gram"
            ? parseInt(e.target.value) / IndexFind.quantity
            : parseInt(e.target.value) / (IndexFind.quantity * 1000);
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: parseInt(e.target.value),
                  price_per_gram: result,
                }
              : item
          )
        );
      }
    } else if (e.target.name == "quantity") {
      let IndexFind = data.find((x, index) => index == itemIndex);
      console.log(IndexFind);
      if (IndexFind.price != "" && IndexFind.quantity_Type != "") {
        let result =
          IndexFind.quantity_Type == "kilogram"
            ? parseInt(IndexFind.price) / (parseInt(e.target.value) * 1000)
            : IndexFind.quantity_Type == "pound"
            ? parseInt(IndexFind.price) / (parseInt(e.target.value) * 453.6)
            : IndexFind.quantity_Type == "ounces"
            ? parseInt(IndexFind.price) / (parseInt(e.target.value) * 28.35)
            : IndexFind.quantity_Type == "milligram"
            ? parseInt(IndexFind.price) / (parseInt(e.target.value) * 0.001)
            : IndexFind.quantity_Type == "gram"
            ? parseInt(IndexFind.price) / parseInt(e.target.value)
            : parseInt(IndexFind.price) / (parseInt(e.target.value) * 1000);
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: parseInt(e.target.value),
                  price_per_gram: result,
                }
              : item
          )
        );
      } else {
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? { ...item, [e.target.name]: parseInt(e.target.value) }
              : item
          )
        );
      }
    } else if (e.target.name == "quantity_Type") {
      let IndexFind = data.find((x, index) => index == itemIndex);
      console.log(IndexFind);
      if (IndexFind.price != "" && IndexFind.quantity != "") {
        let result =
          e.target.value == "kilogram"
            ? parseInt(IndexFind.price) / (parseInt(IndexFind.quantity) * 1000)
            : e.target.value == "pound"
            ? parseInt(IndexFind.price) / (parseInt(IndexFind.quantity) * 453.6)
            : e.target.value == "ounces"
            ? parseInt(IndexFind.price) / (parseInt(IndexFind.quantity) * 28.35)
            : e.target.value == "milligram"
            ? parseInt(IndexFind.price) / (parseInt(IndexFind.quantity) * 0.001)
            : e.target.value == "gram"
            ? parseInt(IndexFind.price) / IndexFind.quantity
            : parseInt(IndexFind.price) / (parseInt(IndexFind.quantity) * 1000);
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: e.target.value,
                  price_per_gram: result,
                }
              : item
          )
        );
      } else {
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? { ...item, [e.target.name]: e.target.value }
              : item
          )
        );
      }
    } else {
      setData(
        data.map((item, index) =>
          index == itemIndex
            ? { ...item, [e.target.name]: e.target.value }
            : item
        )
      );
    }
  };
  const deleteHandler = (Itemindex) => {
    let deleteItem = data.find((x, index) => index == Itemindex);
    dispatch(deleteExpensesByIdAction(deleteItem));
  };
  const editHandler = (item) => {
    console.log("ji");
    setData(
      data.map((x, index) => (item == index ? { ...x, isEditing: true } : x))
    );
  };
  const saveHandler = (item) => {
    let editItem = data.find((x, index) => index == item);
    dispatch(editExpensesByIdAction(editItem));
  };
  console.log(data);
  return (
    <>
      <PageTitle activeMenu="Inventory" motherMenu="MenuItem" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Expenses List</h4>
        </div>
        <Table striped>
          <thead>
            <th>Quantity</th>
            <th>Item Name</th>
            <th>Vendor Name</th>
            <th>Price</th>
            <th>Price per gram</th>
            <th>Ingredient</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, index) => (
                <>
                  {item.isEditing == true ? (
                    <tr key={index}>
                      <td
                        className="d-flex"
                        style={{ minWidth: " 350px", width: " 350px" }}
                      >
                        <input
                          type="number"
                          value={item.quantity}
                          name="quantity"
                          onChange={(e) => inputHandler(e, index)}
                          className="p-2"
                        />
                        <select
                          name="quantity_Type"
                          value={item.quantity_Type}
                          onChange={(e) => inputHandler(e, index)}
                        >
                          <option value="">Choose Weight</option>
                          <option value="kilogram">kilogram</option>
                          <option value="liter">liter</option>
                          <option value="gram">gram</option>
                          <option value="pound">pounds</option>
                          <option value="ounces">ounces</option>
                          <option value="milligram">milligram</option>
                        </select>
                      </td>
                      <td>
                        <input
                          name="name"
                          value={item.name}
                          onChange={(e) => inputHandler(e, index)}
                          type="text"
                          className="p-2"
                        />
                      </td>
                      <td>
                        <input
                          name="vendor"
                          value={item.vendor}
                          onChange={(e) => inputHandler(e, index)}
                          type="text"
                          className="p-2"
                        />
                      </td>
                      <td>
                        <input
                          name="price"
                          value={item.price}
                          onChange={(e) => inputHandler(e, index)}
                          type="number"
                          className="p-2"
                        />
                      </td>
                      <td>
                        <input
                          value={item.price_per_gram}
                          name="price_per_gram"
                          onChange={(e) => inputHandler(e, index)}
                          type="number"
                          className="p-2"
                        />
                      </td>
                      {/* <td>
                        <input
                          value={item.isIngredient}
                          name="isIngredient"
                          type="checkbox"
                            onChange={(e) => {
                              setData(
                                data.map((item, i) =>
                                  i == index
                                    ? {
                                        ...item,
                                        [e.target.name]: e.target.checked,
                                      }
                                    : item
                                )
                              );
                            }}
                        />
                        <label className="px-1">This is Ingredient</label>
                      </td> */}
                      <td>
                        <input type="checkbox" checked={item.isIngredient} />
                        <label className="px-1">This is Ingredient</label>
                      </td>
                      <td className="d-flex">
                        <img
                          className="px-2"
                          src={checkCircle}
                          onClick={() => saveHandler(index)}
                        />
                        <img
                          className="px-2"
                          onClick={() => deleteHandler(index)}
                          src={Trash}
                        />
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td className="d-flex">
                        {item.quantity} {item.quantity_Type}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.vendor}</td>
                      <td>{item.price}</td>
                      <td>{item.price_per_gram}</td>
                      <td>
                        <input type="checkbox" checked={item.isIngredient} />
                        <label className="px-1">This is Ingredient</label>
                      </td>
                      <td className="d-flex">
                        <img
                          className="px-2 cursor-pointer"
                          onClick={() => editHandler(index)}
                          src={Edit}
                        />
                        <img
                          className="px-2"
                          onClick={() => deleteHandler(index)}
                          src={Trash}
                        />
                      </td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ExpensesList;
