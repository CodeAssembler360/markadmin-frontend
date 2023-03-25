import React, { useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import checkCircle from "../../../../../images/checkCircle.svg";
import Trash from "../../../../../images/Trash.svg";
import Edit from "../../../../../images/Edit.svg";
import { useDispatch } from "react-redux";
import { postExpensesAction } from "../../../../../store/actions/ExpensesAction";
const items = {
  quantity: "",
  quantity_Type: "",
  vendor: "",
  name: "",
  price: "",
  price_per_gram: "",
  isIngredient: false,
  isEditing: true,
};
const Expenses = () => {
  const dispatch = useDispatch();
  let obj = { name: "", amount: "" };
  const [data, setData] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [item, setItem] = useState(obj);
  const itemHandler = () => {
    setData([...data, item]);
    setItem(obj);
  };
  // const inputHandler = (e) => {
  //   setItem({
  //     ...item,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const dataHandler = (e) => {
    setData(
      data.map((x, index) =>
        x.name == e.target.name ? { ...x, amount: e.target.value } : x
      )
    );
  };
  console.log("e", item);
  console.log("data", data);
  const deleteHandler = (Itemindex) => {
    setData(data.filter((x, index) => index !== Itemindex));
  };
  const editHandler = (item) => {
    setData(
      data.map((x, index) => (item == index ? { ...x, isEditing: true } : x))
    );
  };
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
  const saveHandler = (item) => {
    setData(
      data.map((x, index) => (item == index ? { ...x, isEditing: false } : x))
    );
  };
  const addIngredient = () => {
    setData([...data, items]);
  };
  const submitHandler = () => {
    let result = data.filter((item) => item.isIngredient === true && item.name);
    console.log(result, "result");
    dispatch(postExpensesAction(data, result));
  };
  return (
    <>
      <PageTitle activeMenu="Expenses" motherMenu="Accounting" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Expenses</h4>
        </div>
        <Button
          onClick={addIngredient}
          style={{ width: "200px" }}
          className="align-self-end m-2"
        >
          Add Expenses
        </Button>
        {data.length > 0 && (
          <Table
            style={{
              display: "block",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
            striped
          >
            <thead>
              <th>Quantity</th>
              <th>Item Name</th>
              <th>Vendor</th>
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
                        <td>
                          <input
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
                          <input type="checkbox" />
                          <label className="px-1">This is Ingredient</label>
                        </td>
                        <td className="d-flex">
                          <img
                            className="px-2"
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
        )}
        {data.length > 0 && (
          <Button
            style={{ width: "200px" }}
            onClick={submitHandler}
            className="self-align-end m-2"
          >
            Submit
          </Button>
        )}
      </div>
      {/* 
        <div className="card-body">
          <form>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="form-group row">
                  <div className="col-6">
                    <input
                      type="text"
                      required
                      name="name"
                      value={item.name}
                      className="form-control"
                      placeholder="Enter name.."
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      name="amount"
                      value={item.amount}
                      className="form-control"
                      placeholder="Enter value.."
                      required
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="form-group row ">
                  <div className="col-11 ">
                    <button
                      type="button"
                      onClick={itemHandler}
                      disabled={item.name == "" || item.amount == ""}
                      className="btn btn-primary"
                    >
                      New Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-lg-6">
                <div className="form-group row">
                  <label
                    className="col-lg-6 col-form-label"
                    htmlFor="ContactName"
                  >
                    Milk
                  </label>
                  <div className="col-lg-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter value.."
                      required
                      name="milk"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group row">
                  <label
                    className="col-lg-6 col-form-label"
                    htmlFor="ContactName"
                  >
                    Dark
                  </label>
                  <div className="col-lg-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter value.."
                      required
                      name="dark"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group row">
                  <label
                    className="col-lg-6 col-form-label"
                    htmlFor="ContactName"
                  >
                    White
                  </label>
                  <div className="col-lg-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter value.."
                      required
                      name="white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              {data.length > 0 &&
                data.map((x, index) => (
                  <div className="col-lg-6">
                    <div className="form-group row">
                      <label
                        className="col-lg-6 col-form-label"
                        htmlFor="ContactName"
                      >
                        {x.name}
                      </label>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          value={x.amount}
                          className="form-control"
                          placeholder="Enter value.."
                          required
                          name={x.name}
                          onChange={dataHandler}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
              <div className="form-group row">
                <div className="col-lg-2 ml-auto">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Expenses;
