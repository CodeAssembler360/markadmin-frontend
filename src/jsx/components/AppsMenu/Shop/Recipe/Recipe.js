import React, { useEffect, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { postRecipeAction } from "../../../../../store/actions/ExpensesAction";
import axios from "axios";
import { URL_ADDRESS } from "../../../../../constant";
import Trash from "../../../../../images/Trash.svg";

const subItem = { name: "", quantity: "", quantity_Type: "" };
const item = {
  recipeName: "",
  Ingredient: [],
  instruction: "",
};
const Recipe = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(item);
  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [dropdownIngredient, setDropdownIngredient] = useState([]);
  const addHandler = () => {
    setData({ ...data, Ingredient: [...data.Ingredient, subItem] });
  };
  useEffect(async () => {
    await axios
      .get(`${URL_ADDRESS}/getInventory`)
      .then((res) => {
        setInventory(res.data);
        const unique2 = res.data.filter((obj, index) => {
          return index === res.data.findIndex((o) => obj.name === o.name);
        });
        setDropdownIngredient(unique2);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(data, "data");
  let previousLength = 0;

  const handleInput = (event) => {
    const bullet = "\u2022";
    const newLength = event.target.value.length;
    const characterCode = event.target.value.substr(-1).charCodeAt(0);
    if (newLength > previousLength) {
      if (characterCode === 10) {
        event.target.value = `${event.target.value}${bullet} `;
        console.log("newlengt", event.target.value);
      } else if (newLength === 1) {
        event.target.value = `${bullet} ${event.target.value}`;
        console.log("newlengt", event.target.value);
      }
    }
    previousLength = newLength;
    setData({ ...data, instruction: event.target.value });
    console.log("newlengt", event.target.value);
  };
  const inputHandler = (e, itemIndex) => {
    if (e.target.name == "recipeName") {
      setData({ ...data, [e.target.name]: e.target.value });
    } else if (e.target.name == "name") {
      const itemFind = inventory.find((x, index) => x.name == e.target.value);
      setData({
        ...data,
        Ingredient: data.Ingredient.map((item, index) =>
          index == itemIndex
            ? {
                ...item,
                [e.target.name]: e.target.value,
                quantity: itemFind?.quantity,
                quantity_Type: itemFind?.quantity_Type,
              }
            : item
        ),
      });
    } else {
      setData({
        ...data,
        Ingredient: data.Ingredient.map((item, index) =>
          index == itemIndex
            ? { ...item, [e.target.name]: e.target.value }
            : item
        ),
      });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("submit");
    dispatch(postRecipeAction(data));
    setData(item);
  };
  const deleteHandler = (itemIndex) => {
    setData({
      ...data,
      Ingredient: data.Ingredient.filter((item, index) => index !== itemIndex),
    });
  };
  console.log("data", data);
  return (
    <>
      <PageTitle activeMenu="Add Recipe" motherMenu="Recipe" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">New Recipe</h4>
        </div>
        <Button
          onClick={addHandler}
          style={{ width: "170px" }}
          className="align-self-end m-2"
        >
          Add Recipe
        </Button>
        {data.Ingredient.length > 0 && (
          <form onSubmit={submitHandler} className="form p-2">
            <div className="d-flex pb-3 justify-content-center align-items-center ">
              <label className="px-2  m-0">Recipe Name</label>
              <input
                name="recipeName"
                required
                onChange={inputHandler}
                style={{ width: "280px" }}
                className="p-2 border-right-0 border-left-0 border-top-0 border-bottom-primary "
                type="text"
              />
            </div>
            <div className="row mx-0 pt-3">
              {data.Ingredient.map((item, index) => (
                <div key={index} className="col-6">
                  <div className="form-group row">
                    <label className="px-2 m-0 col-2 col-form-label">
                      Ingredient Name
                    </label>
                    <select
                      required
                      onChange={(e) => inputHandler(e, index)}
                      name="name"
                      className="form-control col-3"
                    >
                      <option value="">Choose Ingredient</option>
                      {dropdownIngredient.length > 0 &&
                        dropdownIngredient.map((x) => (
                          <option value={x.name}>{x.name} </option>
                        ))}
                    </select>
                    <input
                      type="number"
                      value={item.quantity}
                      placeholder="Enter Quantity"
                      name="quantity"
                      onChange={(e) => inputHandler(e, index)}
                      className="p-2 form-control col-2 mx-1"
                    />
                    <select
                      className="form-control col-3"
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
                    <img
                      className="px-2"
                      onClick={() => deleteHandler(index)}
                      src={Trash}
                    />
                  </div>
                </div>
                /* <div className="col-6">
                <div className="form-group row">
                  <label className="px-2 m-0 col-2 col-form-label">
                    Instruction
                  </label>
                  <input
                    type="text"
                    className="form-control col-9"
                    required
                    placeholder="Enter Instruction"
                  />
                </div>
              </div> */
              ))}
            </div>
            <div style={{ padding: "0 20px" }} className="form-group row">
              <label className="px-2 m-0 col-2 col-form-label">
                Instruction
              </label>
              <textarea
                style={{ width: "80%", padding: "10px" }}
                onInput={(event) => handleInput(event)}
                rows="10"
              ></textarea>
            </div>
            <Button
              style={{ width: "200px" }}
              className="d-flex ml-auto justify-content-center"
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
        {/* <p>{data.instruction}</p>
        {
    data.instruction.split("\n").map(function(item, idx) {
        return (
            <span key={idx}>
                {item}
                <br/>
            </span>
         )
    })
} */}
      </div>
    </>
  );
};

export default Recipe;
