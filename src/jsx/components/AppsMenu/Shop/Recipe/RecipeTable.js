import React, { useEffect, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Trash from "../../../../../images/Trash.svg";
import {
  deleteRecipeActionById,
  getRecipeAction,
} from "../../../../../store/actions/ExpensesAction";
import { useHistory } from "react-router-dom";

const RecipeTable = () => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [data, setData] = useState([]);
  const { recipeList } = useSelector((state) => state.expense);
  useEffect(() => {
    dispatch(getRecipeAction());
  }, []);
  useEffect(() => {
    setData(recipeList);
  }, [recipeList]);
  const deleteHandler = (Itemindex, item) => {
    let deleteItem = data.find((x, index) => x._id == item._id);
    dispatch(deleteRecipeActionById(deleteItem));
  };
  const individualRecipeHandler = (item) => {
    navigate.push(`/ecom-recipe-list/${item._id}`);
  };
  return (
    <>
      <PageTitle activeMenu="Recipe List" motherMenu="Recipe" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Recipe List</h4>
        </div>
        <Table striped>
          <thead>
            <th>Recipe Name</th>
            <th>Ingredient Name</th>
            <th>Ingredient Quantity</th>
            <th>Action</th>
          </thead>
          <tbody>
            {recipeList.length > 0 &&
              recipeList.map((item, index) => (
                <tr key={item._id}>
                  <td
                    onClick={() => individualRecipeHandler(item)}
                    className="d-flex cursor-pointer "
                  >
                    {item.recipeName}
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() => individualRecipeHandler(item)}
                  >
                    {item?.Ingredient[0]?.name}
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() => individualRecipeHandler(item)}
                  >
                    {item?.Ingredient[0]?.quantity}{" "}
                    {item?.Ingredient[0]?.quantity_Type}
                  </td>
                  <td className="d-flex">
                    <img
                      className="px-2 cursor-pointer"
                      onClick={() => deleteHandler(index, item)}
                      src={Trash}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default RecipeTable;
