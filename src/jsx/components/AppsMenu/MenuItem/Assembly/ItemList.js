import React, { useEffect, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Trash from "../../../../../images/Trash.svg";
import checkCircle from "../../../../../images/checkCircle.svg";
import Edit from "../../../../../images/Edit.svg";
import { deleteAssemblyByIdAction, editAssemblyByIdAction, getAssemblyAction } from "../../../../../store/actions/AssemblyAction";

const ItemList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { itemList } = useSelector((state) => state.inventory);
  useEffect(() => {
    dispatch(getAssemblyAction());
  }, []);
  useEffect(() => {
    setData(itemList);
  }, [itemList]);
  const inputHandler = (e, itemIndex) => {
    if (e.target.name == "price") {
      let IndexFind = data.find((x, index) => index == itemIndex);
      console.log(IndexFind);
      if (IndexFind.quantity != "" && IndexFind.quantity_Type != "") {
        let result = parseInt(e.target.value) / IndexFind.quantity;
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: parseInt(e.target.value),
                  price_per_item: result.toFixed(2),
                }
              : item
          )
        );
      }
    } else if (e.target.name == "quantity") {
      let IndexFind = data.find((x, index) => index == itemIndex);
      console.log(IndexFind);
      if (IndexFind.price != "" && IndexFind.quantity_Type != "") {
        let result = IndexFind.price / parseInt(e.target.value);
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: parseInt(e.target.value),
                  price_per_item: result.toFixed(2),
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
    let editItem = data.find((x, index) => index == item);
    dispatch(editAssemblyByIdAction(editItem));
  };
  const deleteHandler = (item) => {
    let deleteItem = data.find((x, index) => index == item);
    dispatch(deleteAssemblyByIdAction(deleteItem))
  };
  const editHandler = (item) => {
    setData(
      data.map((x, index) => (item == index ? { ...x, isEditing: true } : x))
    );
  };
  return (
    <>
      <PageTitle activeMenu="Inventory" motherMenu="MenuItem" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Inventory</h4>
        </div>
        <Table striped>
          <thead>
            <th>Quantity</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Price per item</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, index) => (
                <>
                  {item.isEditing == true ? (
                    <tr key={item._id}>
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
                    <tr key={item._id}>
                      <td className="d-flex">
                        {item.quantity} {item.quantity_Type}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.price_per_item}</td>
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

export default ItemList;
