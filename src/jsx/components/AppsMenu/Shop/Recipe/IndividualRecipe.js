import React, { useEffect, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeActionById } from "../../../../../store/actions/ExpensesAction";
import { useParams } from "react-router-dom";

const IndividualRecipe = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const params = useParams();
  const { individualRecipe } = useSelector((state) => state.expense);
  useEffect(() => {
    dispatch(getRecipeActionById(params.id));
  }, []);
  useEffect(() => {
    setData(individualRecipe);
  }, [individualRecipe]);
  return (
    <>
      <PageTitle activeMenu="Recipe" motherMenu="Recipe" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Recipe</h4>
        </div>
        <h4 className="text-center">{data?.recipeName}</h4>
        <Table striped>
          <thead>
            <th>Ingredient Name</th>
            <th>Ingredient Quantity</th>
          </thead>
          <tbody>
            {data?.Ingredient?.length > 0 &&
              data?.Ingredient.map((item, index) => (
                <tr key={item._id}>
                  <td>{item?.name}</td>
                  <td>
                    {item?.quantity} {item?.quantity_Type}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <h4 className="mx-4">Instruction</h4>
        <p className="mx-4" style={{whiteSpace:"pre-wrap"}}>{individualRecipe?.instruction}</p>
      </div>
    </>
  );
};

export default IndividualRecipe;
