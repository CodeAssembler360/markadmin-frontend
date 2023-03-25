import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAssemblyByIdAction,
  editAssemblyByIdAction,
  getAssemblyAction,
  postAssemblyAction,
} from "../../../../../store/actions/AssemblyAction";
import PageTitle from "../../../../layouts/PageTitle";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import checkCircle from "../../../../../images/checkCircle.svg";
import Trash from "../../../../../images/Trash.svg";
import Edit from "../../../../../images/Edit.svg";
const items = {
  quantity: "",
  quantity_Type: "",
  name: "",
  price: "",
  price_per_item: 0,
  isEditing: true,
};
const Assembly = () => {
  const dispatch = useDispatch();
  let obj = { name: "", amount: "" };
  const { itemList } = useSelector((state) => state.inventory);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  useEffect(() => {
    dispatch(getAssemblyAction());
  }, []);
  useEffect(() => {
    setData(itemList);
  }, [itemList]);
  useEffect(() => {
    let uniqueElements = [...new Set(itemList)];
    const totalQuantity = [];
    const elementCounts = uniqueElements.map((item) => {
      let count = [];
      itemList.filter((str) => {
        if (str.name === item.name) {
          count.push(str.quantity);
        }
      });
      let sum = count.reduce(function (a, b) {
        return a + b;
      });
      totalQuantity.push({ name: item.name, total: sum });
    });
    setTotal(totalQuantity);
  }, [itemList]);
  console.log("data", data);
  const deleteHandler = (Itemindex, item) => {
    if (item?._id) {
      let deleteItem = data.find((x, index) => index == Itemindex);
      dispatch(deleteAssemblyByIdAction(deleteItem));
    } else {
      setData(data.filter((x, index) => index !== Itemindex));
    }
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
        let result = parseFloat(e.target.value) / IndexFind.quantity;
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: parseFloat(e.target.value),
                  price_per_item: result.toFixed(3),
                }
              : item
          )
        );
      }
    } else if (e.target.name == "quantity") {
      let IndexFind = data.find((x, index) => index == itemIndex);
      console.log(IndexFind);
      if (IndexFind.price != "" && IndexFind.quantity_Type != "") {
        let result = IndexFind.price / parseFloat(e.target.value);
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: parseFloat(e.target.value),
                  price_per_item: result.toFixed(3),
                }
              : item
          )
        );
      } else {
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? { ...item, [e.target.name]: parseFloat(e.target.value) }
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
  const saveHandler = (item, obj) => {
    if (obj?._id) {
      let editItem = data.find((x, index) => index == item);
      dispatch(editAssemblyByIdAction(editItem));
    } else {
      dispatch(postAssemblyAction(obj));
    }
  };
  const addIngredient = () => {
    setData([...data, items]);
  };

  return (
    <>
      <PageTitle activeMenu="Items" motherMenu="Inventory" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Inventory Items</h4>
        </div>
        <Button
          style={{ width: "200px" }}
          onClick={addIngredient}
          className="align-self-end m-2"
        >
          Add Item
        </Button>
        {data.length > 0 && (
          <Table striped>
            <thead>
              <th>Quantity</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Price per item</th>
              <th>Total Quantity</th>
              <th>Action</th>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item, index) => (
                  <>
                    {item.isEditing == true ? (
                      <tr key={index}>
                        <td className="d-flex">
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
                            <option value="">Choose Option</option>
                            <option value="pieces">pieces</option>
                            <option value="items">items</option>
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
                            name="price"
                            value={item.price}
                            onChange={(e) => inputHandler(e, index)}
                            type="number"
                            className="p-2"
                          />
                        </td>
                        <td>
                          <input
                            value={item.price_per_item}
                            name="price_per_item"
                            disabled
                            // onChange={(e) => inputHandler(e, index)}
                            type="number"
                            className="p-2"
                          />
                        </td>
                        <td>
                          {total.length > 0 &&
                            total?.find((x) => x.name === item.name)
                              ?.total}{" "}
                          {total.length > 0 && item.quantity_Type}
                        </td>
                        <td className="d-flex">
                          <img
                            className="px-2"
                            src={checkCircle}
                            onClick={() => saveHandler(index, item)}
                          />
                          <img
                            className="px-2"
                            onClick={() => deleteHandler(index, item)}
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
                        <td>{item.price}</td>
                        <td>{item.price_per_item}</td>
                        <td>
                          {total.length > 0 &&
                            total?.find((x) => x.name === item.name)
                              ?.total}{" "}
                          {total.length > 0 && item.quantity_Type}
                        </td>
                        <td className="d-flex">
                          <img
                            className="px-2"
                            onClick={() => editHandler(index)}
                            src={Edit}
                          />
                          <img
                            className="px-2"
                            onClick={() => deleteHandler(index, item)}
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
        {/* {data.length > 0 && (
          <Button
            style={{ width: "200px" }}
            onClick={submitHandler}
            className="self-align-end m-2"
          >
            Submit
          </Button>
        )} */}
      </div>
      {/* <div className="card">
        <div className="card-header">
          <h4 className="card-title">Assembly</h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="form-group row">
                  <div className="col-6">
                    <input
                      type="text"
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
            {data.length > 0 && (
              <div className="form-group row">
                <div className="col-lg-2 ml-auto">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Assembly;
