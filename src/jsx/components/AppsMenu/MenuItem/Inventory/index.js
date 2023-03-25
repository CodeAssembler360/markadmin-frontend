import React, { useEffect, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import checkCircle from "../../../../../images/checkCircle.svg";
import Trash from "../../../../../images/Trash.svg";
import Edit from "../../../../../images/Edit.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInventoryByIdAction,
  editInventoryByIdAction,
  getInventoryAction,
  postInventoryAction,
} from "../../../../../store/actions/InventoryAction";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Button as MuiButton,
  Typography,
  TextField,
  useMediaQuery,
} from "@mui/material";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

const items = {
  quantity: "",
  quantity_Type: "",
  name: "",
  price: "",
  price_per_gram: 0,
  isEditing: true,
};
const newProduct = {
  quantity: "",
  quantity_Type: "",
  product: "",
  flavor: "",
  price: "",
  type: "",
  price_per_gram: 0,
  isEditing: false,
};
const flavors = [
  {
    name: "Chocolate Bar",
    flavor: [
      "Dark",
      "Milk",
      "White",
      "Peppermint",
      "Peach",
      "Cookies and cream",
      "Peanut Butter",
      "Banana",
      "Berry Burst",
      "Strawberry",
      "Smores",
    ],
  },
  {
    name: "Pectin Gummies",
    flavor: [
      "Mango",
      "Mandarin",
      "Grape",
      "Peach",
      "Lemon",
      "Blueberry",
      "Blackberry",
      "Orange",
      "Kiwi",
      "Strawberry",
      "Pineapple",
      "Green apple",
      "Blue Raspberry",
      "Pink Lemonade",
      "Watermelon",
    ],
  },
  {
    name: "Hard Candies",
    flavor: [
      "Mango",
      "Mandarin",
      "Grape",
      "Peach",
      "Lemon",
      "Blueberry",
      "Blackberry",
      "Orange",
      "Kiwi",
      "Strawberry",
      "Pineapple",
      "Green apple",
      "Blue Raspberry",
      "Pink Lemonade",
      "Watermelon",
    ],
  },
  {
    name: "Gelatin Gummies",
    flavor: [
      "Mango",
      "Mandarin",
      "Grape",
      "Peach",
      "Lemon",
      "Blueberry",
      "Blackberry",
      "Orange",
      "Kiwi",
      "Strawberry",
      "Pineapple",
      "Green apple",
      "Blue Raspberry",
      "Pink Lemonade",
      "Watermelon",
    ],
  },
  {
    name: "Lollipops",
    flavor: [
      "Mango",
      "Mandarin",
      "Grape",
      "Peach",
      "Lemon",
      "Blueberry",
      "Blackberry",
      "Orange",
      "Kiwi",
      "Strawberry",
      "Pineapple",
      "Green apple",
      "Blue Raspberry",
      "Pink Lemonade",
      "Watermelon",
    ],
  },
];

const Inventory = () => {
  const mobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  let obj = { name: "", amount: "" };
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState(obj);
  const [newItem, setNewItem] = useState(newProduct);
  const [total, setTotal] = useState([]);
  const { ingredientList } = useSelector((state) => state.inventory);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: mobile ? "95%" : "600px",
    bgcolor: "#f6f6f6",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };
  useEffect(() => {
    dispatch(getInventoryAction());
    console.log("here");
  }, []);
  useEffect(() => {
    console.log(`ingredientList  :`, ingredientList);
    setData(ingredientList);
  }, [ingredientList]);
  useEffect(() => {
    let uniqueElements = [...new Set(ingredientList)];
    const totalQuantity = [];
    const elementCounts = uniqueElements.map((item) => {
      let count = [];
      ingredientList.filter((str) => {
        if (str.product === item.product && str.flavor === item.flavor) {
          count.push(str.quantity);
        }
      });
      let sum = count.reduce(function (a, b) {
        return a + b;
      });
      totalQuantity.push({
        product: item.product,
        flavor: item.flavor,
        total: sum,
      });
    });
    setTotal(totalQuantity);
  }, [ingredientList]);
  console.log("e", item);
  console.log("data", data);
  const deleteHandler = (Itemindex, item) => {
    if (item?._id) {
      let deleteItem = data.find((x, index) => index == Itemindex);
      dispatch(deleteInventoryByIdAction(deleteItem));
    } else {
      setData(data.filter((x, index) => index !== Itemindex));
    }
  };
  const editHandler = (item) => {
    setNewItem(data.find((x, index) => item === index));
    setUpdate(true);
    // setData(
    //   data.map((x, index) => (item == index ? { ...x, isEditing: true } : x))
    // );
  };
  const modalHandler = (e) => {
    if (e.target.name == "price") {
      if (newItem.quantity != "" && newItem.quantity_Type != "") {
        let result =
          newItem.quantity_Type == "kilogram"
            ? parseFloat(e.target.value) / (newItem.quantity * 1000)
            : newItem.quantity_Type == "pound"
            ? parseFloat(e.target.value) / (newItem.quantity * 453.6)
            : newItem.quantity_Type == "ounces"
            ? parseFloat(e.target.value) / (newItem.quantity * 28.35)
            : newItem.quantity_Type == "milligram"
            ? parseFloat(e.target.value) / (newItem.quantity * 0.001)
            : newItem.quantity_Type == "gram"
            ? parseFloat(e.target.value) / newItem.quantity
            : parseFloat(e.target.value) / (newItem.quantity * 1000);
        console.log(result, "re");
        setNewItem({
          ...newItem,
          [e.target.name]: parseFloat(e.target.value),
          price_per_gram: result.toFixed(3),
        });
      }
    } else if (e.target.name == "quantity") {
      if (newItem.price != "" && newItem.quantity_Type != "") {
        let result =
          newItem.quantity_Type == "kilogram"
            ? parseFloat(newItem.price) / (parseFloat(e.target.value) * 1000)
            : newItem.quantity_Type == "pound"
            ? parseFloat(newItem.price) / (parseFloat(e.target.value) * 453.6)
            : newItem.quantity_Type == "ounces"
            ? parseFloat(newItem.price) / (parseFloat(e.target.value) * 28.35)
            : newItem.quantity_Type == "milligram"
            ? parseFloat(newItem.price) / (parseFloat(e.target.value) * 0.001)
            : newItem.quantity_Type == "gram"
            ? parseFloat(newItem.price) / parseFloat(e.target.value)
            : parseFloat(newItem.price) / (parseFloat(e.target.value) * 1000);
        console.log(result, "re");
        setNewItem({
          ...newItem,
          [e.target.name]: parseFloat(e.target.value),
          price_per_gram: result.toFixed(3),
        });
      } else {
        setNewItem({ ...newItem, [e.target.name]: parseFloat(e.target.value) });
      }
    } else if (e.target.name == "quantity_Type") {
      if (newItem.price != "" && newItem.quantity != "") {
        let result =
          e.target.value == "kilogram"
            ? parseFloat(newItem.price) / (parseFloat(newItem.quantity) * 1000)
            : e.target.value == "pound"
            ? parseFloat(newItem.price) / (parseFloat(newItem.quantity) * 453.6)
            : e.target.value == "ounces"
            ? parseFloat(newItem.price) / (parseFloat(newItem.quantity) * 28.35)
            : e.target.value == "milligram"
            ? parseFloat(newItem.price) / (parseFloat(newItem.quantity) * 0.001)
            : e.target.value == "gram"
            ? parseFloat(newItem.price) / newItem.quantity
            : parseFloat(newItem.price) / (parseFloat(newItem.quantity) * 1000);
        console.log(result, "re");
        setNewItem({
          ...newItem,
          [e.target.name]: e.target.value,
          price_per_gram: result.toFixed(3),
        });
      } else {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
      }
    } else {
      setNewItem({ ...newItem, [e.target.name]: e.target.value });
    }
  };
  const inputHandler = (e, itemIndex) => {
    if (e.target.name == "price") {
      let IndexFind = data.find((x, index) => index == itemIndex);
      console.log(IndexFind);
      if (IndexFind.quantity != "" && IndexFind.quantity_Type != "") {
        let result =
          IndexFind.quantity_Type == "kilogram"
            ? parseFloat(e.target.value) / (IndexFind.quantity * 1000)
            : IndexFind.quantity_Type == "pound"
            ? parseFloat(e.target.value) / (IndexFind.quantity * 453.6)
            : IndexFind.quantity_Type == "ounces"
            ? parseFloat(e.target.value) / (IndexFind.quantity * 28.35)
            : IndexFind.quantity_Type == "milligram"
            ? parseFloat(e.target.value) / (IndexFind.quantity * 0.001)
            : IndexFind.quantity_Type == "gram"
            ? parseFloat(e.target.value) / IndexFind.quantity
            : parseFloat(e.target.value) / (IndexFind.quantity * 1000);
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: parseFloat(e.target.value),
                  price_per_gram: result.toFixed(3),
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
            ? parseFloat(IndexFind.price) / (parseFloat(e.target.value) * 1000)
            : IndexFind.quantity_Type == "pound"
            ? parseFloat(IndexFind.price) / (parseFloat(e.target.value) * 453.6)
            : IndexFind.quantity_Type == "ounces"
            ? parseFloat(IndexFind.price) / (parseFloat(e.target.value) * 28.35)
            : IndexFind.quantity_Type == "milligram"
            ? parseFloat(IndexFind.price) / (parseFloat(e.target.value) * 0.001)
            : IndexFind.quantity_Type == "gram"
            ? parseFloat(IndexFind.price) / parseFloat(e.target.value)
            : parseFloat(IndexFind.price) / (parseFloat(e.target.value) * 1000);
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: parseFloat(e.target.value),
                  price_per_gram: result.toFixed(3),
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
    } else if (e.target.name == "quantity_Type") {
      let IndexFind = data.find((x, index) => index == itemIndex);
      console.log(IndexFind);
      if (IndexFind.price != "" && IndexFind.quantity != "") {
        let result =
          e.target.value == "kilogram"
            ? parseFloat(IndexFind.price) /
              (parseFloat(IndexFind.quantity) * 1000)
            : e.target.value == "pound"
            ? parseFloat(IndexFind.price) /
              (parseFloat(IndexFind.quantity) * 453.6)
            : e.target.value == "ounces"
            ? parseFloat(IndexFind.price) /
              (parseFloat(IndexFind.quantity) * 28.35)
            : e.target.value == "milligram"
            ? parseFloat(IndexFind.price) /
              (parseFloat(IndexFind.quantity) * 0.001)
            : e.target.value == "gram"
            ? parseFloat(IndexFind.price) / IndexFind.quantity
            : parseFloat(IndexFind.price) /
              (parseFloat(IndexFind.quantity) * 1000);
        console.log(result, "re");
        setData(
          data.map((item, index) =>
            index == itemIndex
              ? {
                  ...item,
                  [e.target.name]: e.target.value,
                  price_per_gram: result.toFixed(3),
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
  const saveHandler = (itemIndex, item) => {
    setCheck(true);
    if (item?._id) {
      let editItem = data.find((x, index) => index == itemIndex);
      dispatch(editInventoryByIdAction(editItem));
    } else {
      dispatch(postInventoryAction(item));
    }
    setTimeout(() => {
      setCheck(false);
    }, 5000);
  };
  const addIngredient = () => {
    setOpen(true);
    // setData([...data, items]);
  };
  const checkData = () => {
    let result = data.find(
      (x) => x.product === newItem.product && x.flavor === newItem.flavor
    );
    console.log(result, "_id");
    if (result !== undefined) {
      dispatch(postInventoryAction(newItem, result._id));
    } else {
      dispatch(postInventoryAction(newItem));
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    checkData();
    setNewItem(newProduct);
    setOpen(false);
  };
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(editInventoryByIdAction(newItem));
    setNewItem(newProduct);
    setUpdate(false);
  };
  console.log(newItem, "newItem");
  return (
    <>
      <PageTitle activeMenu="Ingredients" motherMenu="Inventory" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Inventory Ingredients</h4>
        </div>
        <Button
          style={{ width: "200px" }}
          onClick={addIngredient}
          className="align-self-end m-2"
        >
          Add Ingredient
        </Button>
        {data.length > 0 && (
          <PerfectScrollbar>
            <Table striped style={{ whiteSpace: "nowrap" }}>
              <thead>
                <th>Product</th>
                <th>Flavour</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Price per gram</th>
                <th>Total Quantity</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((item, index) => (
                    <>
                      {item.isEditing == true ? (
                        <tr key={index}>
                          <td>
                            <input
                              name="product"
                              value={item.product}
                              onChange={(e) => inputHandler(e, index)}
                              type="text"
                              className="p-2"
                            />
                          </td>
                          <td>
                            <input
                              name="flavor"
                              value={item.flavor}
                              onChange={(e) => inputHandler(e, index)}
                              type="text"
                              className="p-2"
                            />
                          </td>
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
                              disabled
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
                            {check ? (
                              <img className="px-2" src={checkCircle} />
                            ) : (
                              <img
                                className="px-2"
                                src={checkCircle}
                                onClick={() => saveHandler(index, item)}
                              />
                            )}
                            <img
                              className="px-2"
                              onClick={() => deleteHandler(index, item)}
                              src={Trash}
                            />
                          </td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td>{item.product}</td>
                          <td>{item.flavor}</td>
                          <td className="d-flex">
                            {item.quantity} {item.quantity_Type}
                          </td>
                          <td>{item.price}</td>
                          <td>{item.price_per_gram}</td>
                          <td>
                            {total.length > 0 &&
                              total.find(
                                (x) =>
                                  x.product === item.product &&
                                  x.flavor === item.flavor
                              ).total}{" "}
                            {total.length > 0 && item.quantity_Type}
                          </td>
                          <td className="d-flex">
                            {check ? (
                              <img className="px-2" src={Edit} />
                            ) : (
                              <img
                                className="px-2"
                                onClick={() => editHandler(index, item)}
                                src={Edit}
                              />
                            )}
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
          </PerfectScrollbar>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style} component="form" onSubmit={submitHandler}>
          <Typography
            variant="h4"
            sx={{ color: "#eb8153" }}
            fontFamily="Poppins"
            textTransform="uppercase"
            pb={2}
            textAlign="center"
          >
            New Ingredient
          </Typography>
          <Grid container columnSpacing={2} rowGap={2}>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="product"
                  name="product"
                  value={newItem.product}
                  required
                  onChange={modalHandler}
                >
                  <MenuItem value="Chocolate Bar">Chocolate Bar</MenuItem>
                  <MenuItem value="Pectin Gummies">Pectin Gummies</MenuItem>
                  <MenuItem value="Gelatin Gummies">Gelatin Gummies</MenuItem>
                  <MenuItem value="Hard Candies">Hard Candies</MenuItem>
                  <MenuItem value="Lollipops">Lollipops</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Flavor</InputLabel>
                <Select
                  disabled={newItem.product == ""}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="flavor"
                  name="flavor"
                  required
                  value={newItem.flavor}
                  onChange={modalHandler}
                >
                  {flavors.map(
                    (item) =>
                      item.name === newItem.product &&
                      item.flavor.map((flavour) => (
                        <MenuItem value={flavour && flavour}>
                          {flavour && flavour}
                        </MenuItem>
                      ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} container item columnSpacing={1}>
              <Grid xs={5} item>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Quantity"
                  name="quantity"
                  variant="outlined"
                  type="number"
                  required
                  value={newItem.quantity}
                  onChange={modalHandler}
                />
              </Grid>
              <Grid xs={7} item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Quantity Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Quantity Type"
                    name="quantity_Type"
                    value={newItem.quantity_Type}
                    required
                    onChange={modalHandler}
                  >
                    <MenuItem value="kilogram">kilogram</MenuItem>
                    <MenuItem value="liter">liter</MenuItem>
                    <MenuItem value="gram">gram</MenuItem>
                    <MenuItem value="pound">pounds</MenuItem>
                    <MenuItem value="ounces">ounces</MenuItem>
                    <MenuItem value="milligram">milligram</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type"
                  name="type"
                  onChange={modalHandler}
                  required
                  value={newItem.type}
                >
                  <MenuItem value="Shroom">Shroom</MenuItem>
                  <MenuItem value="THC">THC</MenuItem>
                  <MenuItem value="CBD">CBD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Price"
                name="price"
                value={newItem.price}
                variant="outlined"
                type="number"
                required
                onChange={modalHandler}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Price Per Grams"
                onChange={modalHandler}
                name="price_per_gram"
                disabled
                value={newItem.price_per_gram}
                variant="outlined"
                type="number"
              />
            </Grid>

            <Grid xs={6} sm={8} item />
            <Grid xs={6} sm={4} item>
              {" "}
              <Button type="submit" style={{ width: "100%" }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={update} onClose={() => setUpdate(false)}>
        <Box sx={style} component="form" onSubmit={updateHandler}>
          <Typography
            variant="h4"
            sx={{ color: "#eb8153" }}
            fontFamily="Poppins"
            textTransform="uppercase"
            pb={2}
            textAlign="center"
          >
            New Ingredient
          </Typography>
          <Grid container columnSpacing={2} rowGap={2}>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="product"
                  name="product"
                  value={newItem.product}
                  required
                  onChange={modalHandler}
                >
                  <MenuItem value="Chocolate Bar">Chocolate Bar</MenuItem>
                  <MenuItem value="Pectin Gummies">Pectin Gummies</MenuItem>
                  <MenuItem value="Gelatin Gummies">Gelatin Gummies</MenuItem>
                  <MenuItem value="Hard Candies">Hard Candies</MenuItem>
                  <MenuItem value="Lollipops">Lollipops</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Flavor</InputLabel>
                <Select
                  disabled={newItem.product == ""}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="flavor"
                  name="flavor"
                  required
                  value={newItem.flavor}
                  onChange={modalHandler}
                >
                  {flavors.map(
                    (item) =>
                      item.name === newItem.product &&
                      item.flavor.map((flavour) => (
                        <MenuItem value={flavour && flavour}>
                          {flavour && flavour}
                        </MenuItem>
                      ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} container item columnSpacing={1}>
              <Grid xs={5} item>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Quantity"
                  name="quantity"
                  variant="outlined"
                  type="number"
                  required
                  value={newItem.quantity}
                  onChange={modalHandler}
                />
              </Grid>
              <Grid xs={7} item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Quantity Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Quantity Type"
                    name="quantity_Type"
                    value={newItem.quantity_Type}
                    required
                    onChange={modalHandler}
                  >
                    <MenuItem value="kilogram">kilogram</MenuItem>
                    <MenuItem value="liter">liter</MenuItem>
                    <MenuItem value="gram">gram</MenuItem>
                    <MenuItem value="pound">pounds</MenuItem>
                    <MenuItem value="ounces">ounces</MenuItem>
                    <MenuItem value="milligram">milligram</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type"
                  name="type"
                  onChange={modalHandler}
                  required
                  value={newItem.type}
                >
                  <MenuItem value="Shroom">Shroom</MenuItem>
                  <MenuItem value="THC">THC</MenuItem>
                  <MenuItem value="CBD">CBD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Price"
                name="price"
                value={newItem.price}
                variant="outlined"
                type="number"
                required
                onChange={modalHandler}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Price Per Grams"
                onChange={modalHandler}
                name="price_per_gram"
                disabled
                value={newItem.price_per_gram}
                variant="outlined"
                type="number"
              />
            </Grid>

            <Grid xs={6} sm={8} item />
            <Grid xs={6} sm={4} item>
              {" "}
              <Button type="submit" style={{ width: "100%" }}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Inventory;
