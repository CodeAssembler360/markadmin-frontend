import React, {  useEffect, useMemo, useState } from "react";
import PageTitle from "../../../../layouts/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  editChocolateOrderByIdAction,
  getChocolateOrderByIdAction,
  postChocolateOrder,
  updateChocolateOrderByIdAction,
} from "../../../../../store/actions/OrderAction";
const flavors = {
  name: "",
  Amount: "",
};
export const IndividualsOrder = () => {
  const [flavor, setFlavour] = useState([]);
  const [order, setOrder] = useState({});
  const [count, setCount] = useState(0);
  const { individualOrder } = useSelector((state) => state.orders);
  const param = useParams();
  console.log("params",param)
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => [dispatch(getChocolateOrderByIdAction(param.id))], []);
  useEffect(() => {
    setOrder(individualOrder);
  }, [individualOrder]);
  useEffect(() => {
   if(count>=0&&count<2){
    setCount((count)=>count+1)
   }
   else{
    if (order.active_ingredient != "") {
      let TotalBar;
      let val;
      let active;
      let key = Object.keys(order);
      if (order.Customer_Material_Weight == "lbs") {
        TotalBar = (order.Customer_Material * 450) / order.active_ingredient;
        val = TotalBar / 3;
        active = (val * order.active_ingredient);
        if (TotalBar != "Infinity") {
          key.map((x) => {
            if (order.Bar_type == x) {
              let amounts;
              let lbs;
              let grams;
              let result;
              if (order.types_Of_Bar == "Bags of Chocolates") {
                amounts = (order[x] * val) / (22 * 450);
                lbs = amounts.toFixed(2).split(".")[1];
                if (lbs !== 0) {
                  console.log("lbs", lbs);
                  lbs = `0.${lbs}`;
                  lbs = parseFloat(lbs);
                  lbs = lbs * 22;
                }
                grams = lbs.toFixed(2).split(".")[1];
                if (grams != 0) {
                  grams = `0.${grams}`;
                  grams = parseFloat(grams);
                  grams = grams * 450;
                  grams = grams.toFixed(0);
                }
                amounts = amounts.toString().split(".")[0];
                lbs = lbs.toString().split(".")[0];
                result = `${amounts} bag ${lbs} lbs ${grams} gm`;
              } else if (order.types_Of_Bar == "Bricks of Chocolates") {
                amounts = (order[x] * val) / (11 * 450);
                lbs = amounts.toFixed(2).split(".")[1];
                if (lbs !== 0) {
                  console.log("lbs", lbs);
                  lbs = `0.${lbs}`;
                  lbs = parseFloat(lbs);
                  lbs = lbs * 11;
                }
                grams = lbs.toFixed(2).split(".")[1];
                if (grams != 0) {
                  grams = `0.${grams}`;
                  grams = parseFloat(grams);
                  grams = grams * 450;
                  grams = grams.toFixed(0);
                }
                amounts = amounts.toString().split(".")[0];
                lbs = lbs.toString().split(".")[0];
                result = `${amounts} brick ${lbs} lbs ${grams} gm`;
              } else {
                amounts = 0;
              }
              setOrder({
                ...order,
                Customer_Provider: `${order.Customer_Material} ${order.Customer_Material_Weight}`,
                totalBar: TotalBar.toFixed(2),
                flavorss: order.flavorss.map((item) =>
                  item.name != ""
                    ? {
                        ...item,
                        price: val.toFixed(0),
                        amount: result,
                        active: active.toFixed(2),
                      }
                    : item
                ),
              });
            }
          });
        } else {
          key.map((x) => {
            if (order.Bar_type == x) {
              let amounts;
              let lbs;
              let grams;
              let result;
              if (order.types_Of_Bar == "Bags of Chocolates") {
                amounts = (order[x] * val) / (22 * 450);
                lbs = amounts.toFixed(2).split(".")[1];
                if (lbs !== 0) {
                  console.log("lbs", lbs);
                  lbs = `0.${lbs}`;
                  lbs = parseFloat(lbs);
                  lbs = lbs * 22;
                }
                grams = lbs.toFixed(2).split(".")[1];
                if (grams != 0) {
                  grams = `0.${grams}`;
                  grams = parseFloat(grams);
                  grams = grams * 450;
                  grams = grams.toFixed(0);
                }
                amounts = amounts.toString().split(".")[0];
                lbs = lbs.toString().split(".")[0];
                result = `${amounts} bag ${lbs} lbs ${grams} gm`;
              } else if (order.types_Of_Bar == "Bricks of Chocolates") {
                amounts = (order[x] * val) / (11 * 450);
                lbs = amounts.toFixed(2).split(".")[1];
                if (lbs !== 0) {
                  console.log("lbs", lbs);
                  lbs = `0.${lbs}`;
                  lbs = parseFloat(lbs);
                  lbs = lbs * 11;
                }
                grams = lbs.toFixed(2).split(".")[1];
                if (grams != 0) {
                  grams = `0.${grams}`;
                  grams = parseFloat(grams);
                  grams = grams * 450;
                  grams = grams.toFixed(0);
                }
                amounts = amounts.toString().split(".")[0];
                lbs = lbs.toString().split(".")[0];
                result = `${amounts} brick ${lbs} lbs ${grams} gm`;
              } else {
                amounts = 0;
              }
              setOrder({
                ...order,
                Customer_Provider: `${order.Customer_Material} ${order.Customer_Material_Weight}`,
                totalBar: "",
                flavorss: order.flavorss.map((item) =>
                  item.name != ""
                    ? {
                        ...item,
                        price: val.toFixed(0),
                        amount: result,
                        active: active.toFixed(2),
                      }
                    : item
                ),
              });
            }
          });
        }
      } else {
        TotalBar = order.Customer_Material / order.active_ingredient;
        val = TotalBar / 3;
        active = val * order.active_ingredient;
        if (TotalBar != "Infinity") {
          key.map((x) => {
            if (order.Bar_type == x) {
              let amounts;
              let lbs;
              let grams;
              let result;
              if (order.types_Of_Bar == "Bags of Chocolates") {
                amounts = (order[x] * val) / (22 * 450);
                lbs = amounts.toFixed(2).split(".")[1];
                if (lbs !== 0) {
                  lbs = `0.${lbs}`;
                  lbs = parseFloat(lbs);
                  lbs = lbs * 22;
                }
                grams = lbs.toFixed(2).split(".")[1];
                if (grams != 0) {
                  grams = `0.${grams}`;
                  grams = parseFloat(grams);
                  grams = grams * 450;
                  grams = grams.toFixed(0);
                }
                amounts = amounts.toString().split(".")[0];
                lbs = lbs.toString().split(".")[0];
                result = `${amounts} bag ${lbs} lbs ${grams} gm`;
              } else if (order.types_Of_Bar == "Bricks of Chocolates") {
                amounts = (order[x] * val) / (11 * 450);
                lbs = amounts.toFixed(2).split(".")[1];
                if (lbs !== 0) {
                  lbs = `0.${lbs}`;
                  lbs = parseFloat(lbs);
                  lbs = lbs * 11;
                }
                grams = lbs.toFixed(2).split(".")[1];
                if (grams != 0) {
                  grams = `0.${grams}`;
                  grams = parseFloat(grams);
                  grams = grams * 450;
                  grams = grams.toFixed(0);
                }
                amounts = amounts.toString().split(".")[0];
                lbs = lbs.toString().split(".")[0];
                result = `${amounts} brick ${lbs} lbs ${grams} gm`;
              } else {
                amounts = 0;
              }
              setOrder({
                ...order,
                Customer_Provider: `${order.Customer_Material} ${order.Customer_Material_Weight}`,
                totalBar: TotalBar.toFixed(2),
                flavorss: order.flavorss.map((item) =>
                  item.name != ""
                    ? {
                        ...item,
                        price: val.toFixed(0),
                        amount: result,
                        active: active.toFixed(2),
                      }
                    : item
                ),
              });
            }
          });
        } else {
          key.map((x) => {
            if (order.Bar_type == x) {
              let amounts;
              let lbs;
              let grams;
              let result;
              if (order.types_Of_Bar == "Bags of Chocolates") {
                amounts = (order[x] * val) / (22 * 450);
                lbs = amounts.toFixed(2).split(".")[1];
                if (lbs !== 0) {
                  lbs = `0.${lbs}`;
                  lbs = parseFloat(lbs);
                  lbs = lbs * 22;
                }
                grams = lbs.toFixed(2).split(".")[1];
                if (grams != 0) {
                  grams = `0.${grams}`;
                  grams = parseFloat(grams);
                  grams = grams * 450;
                  grams = grams.toFixed(0);
                }
                amounts = amounts.toString().split(".")[0];
                lbs = lbs.toString().split(".")[0];
                result = `${amounts} bag ${lbs} lbs ${grams} gm`;
              } else if (order.types_Of_Bar == "Bricks of Chocolates") {
                amounts = (order[x] * val) / (11 * 450);
                lbs = amounts.toFixed(2).split(".")[1];
                if (lbs !== 0) {
                  console.log("lbs", lbs);
                  lbs = `0.${lbs}`;
                  lbs = parseFloat(lbs);
                  lbs = lbs * 11;
                }
                grams = lbs.toFixed(2).split(".")[1];
                if (grams != 0) {
                  grams = `0.${grams}`;
                  grams = parseFloat(grams);
                  grams = grams * 450;
                  grams = grams.toFixed(0);
                }
                amounts = amounts.toString().split(".")[0];
                lbs = lbs.toString().split(".")[0];
                result = `${amounts} brick ${lbs} lbs ${grams} gm`;
              } else {
                amounts = 0;
              }
              setOrder({
                ...order,
                totalBar: "",
                Customer_Provider: `${order.Customer_Material} ${order.Customer_Material_Weight}`,
                flavorss: order.flavorss.map((item) =>
                  item.name != ""
                    ? {
                        ...item,
                        price: val.toFixed(0),
                        amount: result,
                        active: active.toFixed(2),
                      }
                    : item
                ),
              });
            }
          });
        }
      }
    }
   }
    console.log("click");
  }, [
    order.active_ingredient,
    order.types_Of_Bar,
    order.Bar_type,
    order.Customer_Material,
    order.Customer_Material_Weight,
    order.P12_Break_Up_Bar,
    order.P15_Break_Up_Bar,
    order.XL_Bar,
    order.Small_square,
  ]);

  const newFlavor = () => {
    setFlavour([...flavor, flavors]);
  };

  const flavorHandler = (e) => {
    let flavorFind = order.flavorss.find((x) => x.name == e.target.name);
    if (flavorFind) {
      let key = Object.keys(order);
      key.map((x) => {
        if (order.Bar_type == x) {
          if (e.target.name == "Milk") {
            let amounts;
            let lbs;
            let grams;
            let result;
            let lbs1;
            let grams1;
            let result1;
            let total;
            let amount;
            let actives;
            let active;
            if (order.types_Of_Bar == "Bags of Chocolates") {
              amounts = (order[x] * parseFloat(e.target.value)) / (22 * 450);
              lbs = amounts.toFixed(2).split(".")[1];
              if (lbs !== 0) {
                console.log("lbs", lbs);
                lbs = `0.${lbs}`;
                lbs = parseFloat(lbs);
                lbs = lbs * 22;
              }
              grams = lbs.toFixed(2).split(".")[1];
              if (grams != 0) {
                grams = `0.${grams}`;
                grams = parseFloat(grams);
                grams = grams * 450;
                grams = grams.toFixed(0);
              }
              amounts = amounts.toString().split(".")[0];
              lbs = lbs.toString().split(".")[0];
              result = `${amounts} bag ${lbs} lbs ${grams} gm`;
              //second amount
              total = order.totalBar - parseInt(e.target.value);
              total = total / 2;
              amount = (order[x] * total) / (22 * 450);
              lbs1 = amount.toFixed(2).split(".")[1];
              if (lbs1 !== 0) {
                console.log("lbs", lbs1);
                lbs1 = `0.${lbs1}`;
                lbs1 = parseFloat(lbs1);
                lbs1 = lbs1 * 22;
              }
              grams1 = lbs1.toFixed(2).split(".")[1];
              if (grams1 != 0) {
                grams1 = `0.${grams1}`;
                grams1 = parseFloat(grams1);
                grams1 = grams1 * 450;
                grams1 = grams1.toFixed(0);
              }
              amount = amount.toString().split(".")[0];
              lbs1 = lbs1.toString().split(".")[0];
              result1 = `${amount} bag ${lbs1} lbs ${grams1} gm`;
                active =
                  parseFloat(order.active_ingredient) *
                  parseInt(e.target.value);
                active = active.toFixed(2);
                actives = parseFloat(order.active_ingredient) * parseInt(total);
                actives = actives.toFixed(2);
            } else if (order.types_Of_Bar == "Bricks of Chocolates") {
              amounts = (order[x] * parseFloat(e.target.value)) / (11 * 450);
              lbs = amounts.toFixed(2).split(".")[1];
              if (lbs !== 0) {
                console.log("lbs", lbs);
                lbs = `0.${lbs}`;
                lbs = parseFloat(lbs);
                lbs = lbs * 11;
              }
              grams = lbs.toFixed(2).split(".")[1];
              if (grams != 0) {
                grams = `0.${grams}`;
                grams = parseFloat(grams);
                grams = grams * 450;
                grams = grams.toFixed(0);
              }
              amounts = amounts.toString().split(".")[0];
              lbs = lbs.toString().split(".")[0];
              result = `${amounts} brick ${lbs} lbs ${grams} gm`;
              //second amount
              total = order.totalBar - parseInt(e.target.value);
              total = total / 2;
              amount = (order[x] * total) / (11 * 450);
              lbs1 = amount.toFixed(2).split(".")[1];
              if (lbs1 !== 0) {
                console.log("lbs", lbs1);
                lbs1 = `0.${lbs1}`;
                lbs1 = parseFloat(lbs1);
                lbs1 = lbs1 * 11;
              }
              grams1 = lbs1.toFixed(2).split(".")[1];
              if (grams1 != 0) {
                grams1 = `0.${grams1}`;
                grams1 = parseFloat(grams1);
                grams1 = grams1 * 450;
                grams1 = grams1.toFixed(0);
              }
              amount = amount.toString().split(".")[0];
              lbs1 = lbs1.toString().split(".")[0];
              result1 = `${amount} brick ${lbs1} lbs ${grams1} gm`;
                active =
                  parseFloat(order.active_ingredient) *
                  parseInt(e.target.value);
                active = active.toFixed(2);
                actives = parseFloat(order.active_ingredient) * parseInt(total);
                actives = actives.toFixed(2);
            }

            setOrder({
              ...order,
              flavorss: order.flavorss.map((item) =>
                item.name == flavorFind.name
                  ? {
                      ...flavorFind,
                      price: parseInt(e.target.value),
                      amount: result,
                      active: active,
                    }
                  : {
                      ...item,
                      price: parseInt(total),
                      amount: result1,
                      active: actives,
                    }
              ),
            });
          } else if (e.target.name == "White") {
            let amounts;
            let total;
            let amount;
            let lbs;
            let grams;
            let result;
            let lbs1;
            let grams1;
            let result1;
            let active;
            let actives;
            if (order.types_Of_Bar == "Bags of Chocolates") {
              amounts = (order[x] * parseInt(e.target.value)) / (22 * 450);
              lbs = amounts.toFixed(2).split(".")[1];
              if (lbs !== 0) {
                console.log("lbs", lbs);
                lbs = `0.${lbs}`;
                lbs = parseFloat(lbs);
                lbs = lbs * 22;
              }
              grams = lbs.toFixed(2).split(".")[1];
              if (grams != 0) {
                grams = `0.${grams}`;
                grams = parseFloat(grams);
                grams = grams * 450;
                grams = grams.toFixed(0);
              }
              amounts = amounts.toString().split(".")[0];
              lbs = lbs.toString().split(".")[0];
              result = `${amounts} bag ${lbs} lbs ${grams} gm`;
              // second amount
              total =
                order.totalBar -
                parseInt(e.target.value) -
                order.flavorss[0].price;
              amount = (order[x] * total) / (22 * 450);
              lbs1 = amount.toFixed(2).split(".")[1];
              if (lbs1 !== 0) {
                console.log("lbs", lbs1);
                lbs1 = `0.${lbs1}`;
                lbs1 = parseFloat(lbs1);
                lbs1 = lbs1 * 22;
              }
              grams1 = lbs1.toFixed(2).split(".")[1];
              if (grams1 != 0) {
                grams1 = `0.${grams1}`;
                grams1 = parseFloat(grams1);
                grams1 = grams1 * 450;
                grams1 = grams1.toFixed(0);
              }
              amount = amount.toString().split(".")[0];
              lbs1 = lbs1.toString().split(".")[0];
              result1 = `${amount} bag ${lbs1} lbs ${grams1} gm`;
                active =
                  parseFloat(order.active_ingredient) *
                  parseInt(e.target.value);
                active = active.toFixed(2);
                actives = parseFloat(order.active_ingredient) * parseInt(total);
                actives = actives.toFixed(2);
            } else if (order.types_Of_Bar == "Bricks of Chocolates") {
              amounts = (order[x] * parseInt(e.target.value)) / (11 * 450);
              lbs = amounts.toFixed(2).split(".")[1];
              if (lbs !== 0) {
                lbs = `0.${lbs}`;
                lbs = parseFloat(lbs);
                lbs = lbs * 11;
              }
              grams = lbs.toFixed(2).split(".")[1];
              if (grams != 0) {
                grams = `0.${grams}`;
                grams = parseFloat(grams);
                grams = grams * 450;
                grams = grams.toFixed(0);
              }
              amounts = amounts.toString().split(".")[0];
              lbs = lbs.toString().split(".")[0];
              result = `${amounts} brick ${lbs} lbs ${grams} gm`;
              //second amount
              total =
                order.totalBar -
                parseInt(e.target.value) -
                order.flavorss[0].price;
              amount = (order[x] * total) / (11 * 450);
              lbs1 = amount.toFixed(2).split(".")[1];
              if (lbs1 !== 0) {
                console.log("lbs", lbs1);
                lbs1 = `0.${lbs1}`;
                lbs1 = parseFloat(lbs1);
                lbs1 = lbs1 * 11;
              }
              grams1 = lbs1.toFixed(2).split(".")[1];
              if (grams1 != 0) {
                grams1 = `0.${grams1}`;
                grams1 = parseFloat(grams1);
                grams1 = grams1 * 450;
              }
              amount = amount.toString().split(".")[0];
              lbs1 = lbs1.toString().split(".")[0];
              result1 = `${amount} brick ${lbs1} lbs ${grams1.toFixed(0)} gm`;
              active = parseFloat(order.active_ingredient) * parseInt(e.target.value);
              active = active.toFixed(2);
              actives = parseFloat(order.active_ingredient) * parseInt(total);
              actives = actives.toFixed(2);
            }

            setOrder({
              ...order,
              flavorss: order.flavorss.map((item) =>
                item.name == flavorFind.name
                  ? {
                      ...flavorFind,
                      price: parseInt(e.target.value),
                      amount: result,
                      active: active,
                    }
                  : item.name == "Dark"
                  ? {
                      ...item,
                      price: parseInt(total),
                      amount: result1,
                      active: actives,
                    }
                  : item
              ),
            });
          }
        }
      });
    }
  };
  const routeChange = () => {
    history.push("/ecom-chocolateOrders");
  };
  const submitHandler = async (e) => {
    console.log("hui");
    e.preventDefault();
    dispatch(updateChocolateOrderByIdAction(order,routeChange));
  };
  const editHandler = (e) => {
    if (e.target.name == "active_ingredient") {
      let TotalBar;
      if (order.Customer_Material_Weight == "lbs") {
        TotalBar = (order.Customer_Material * 450) / parseFloat(e.target.value);
        if (TotalBar != "Infinity") {
          setOrder({
            ...order,
            [e.target.name]: parseFloat(e.target.value),
            totalBar: TotalBar.toFixed(2),
          });
        } else {
          setOrder({
            ...order,
            [e.target.name]: parseFloat(e.target.value),
            totalBar: "",
          });
        }
      } else {
        TotalBar = order.Customer_Material / parseFloat(e.target.value);
        if (TotalBar != "Infinity") {
          setOrder({
            ...order,
            [e.target.name]: parseFloat(e.target.value),
            totalBar: TotalBar.toFixed(2),
          });
        } else {
          setOrder({
            ...order,
            [e.target.name]: parseFloat(e.target.value),
            totalBar: "",
          });
        }
      }
    } else if (
      e.target.name == "Bar_type" ||
      e.target.name == "Customer_Material_Weight" ||
      e.target.name == "types_Of_Bar"
    ) {
      setOrder({
        ...order,
        [e.target.name]: e.target.value,
      });
    } else {
      setOrder({
        ...order,
        [e.target.name]: parseFloat(e.target.value),
      });
    }
  };
  console.log("order",individualOrder);
  return (
    <>
    <PageTitle activeMenu="ProductList" motherMenu="Shop" />
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">New Order</h4>
      </div>
      <div className="card-body">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group row">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="ContactName"
                >
                  ContactName
                </label>
                <div className="col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="ContactName"
                    name="ContactName"
                    onChange={editHandler}
                    value={order?.ContactName?.ContactName}
                    disabled
                    placeholder="Enter a contact name.."
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  className="col-lg-6  col-form-label"
                  htmlFor="12 Piece Break up Bar "
                >
                  12 Piece Break up Bar (grams){" "}
                </label>
                <div className="col-lg-6">
                  <input
                    type="number"
                    className="form-control"
                    onChange={editHandler}
                    value={order.P12_Break_Up_Bar}
                    id="12 Piece Break up Bar "
                    name="P12_Break_Up_Bar"
                    required
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="15 Piece Break up Bar "
                >
                  15 Piece Break up Bar (grams){" "}
                </label>
                <div className="col-lg-6">
                  <input
                    type="number"
                    className="form-control"
                    onChange={editHandler}
                    value={order.P15_Break_Up_Bar}
                    id="15 Piece Break up Bar "
                    name="P15_Break_Up_Bar"
                    required
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-6 col-form-label" htmlFor="XL Bar  ">
                  XL Bar (grams)
                </label>
                <div className="col-lg-6">
                  <input
                    type="number"
                    className="form-control"
                    onChange={editHandler}
                    value={order.XL_Bar}
                    id="XL Bar"
                    name="XL_Bar"
                    required
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="Small square "
                >
                  Small square (grams)
                </label>
                <div className="col-lg-6">
                  <input
                    type="number"
                    className="form-control"
                    onChange={editHandler}
                    value={order.Small_square}
                    id="Small square "
                    name="Small_square"
                    required
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="Type of Bar"
                >
                  Type of bar <span className="text-danger  "></span>
                </label>
                <div className="col-lg-6">
                  <select
                    onChange={editHandler}
                    name="Bar_type"
                    required
                    value={order.Bar_type}
                    className="custom-select"
                  >
                    <option value="" >
                      Choose bar
                    </option>
                    <option value="P12_Break_Up_Bar">
                      12 Piece Break up Bar{" "}
                    </option>
                    <option value="P15_Break_Up_Bar">
                      15 Piece Break up Bar{" "}
                    </option>
                    <option value="XL_Bar">Xl Bar</option>
                    <option value="Small_square">Small square</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="Did the Customer Provide Material  "
                >
                  Did the Customer Provide Material{" "}
                </label>
                <div className=" col-lg-6">
                  <div className="row align-items-center gap-2 pl-3 justify-content-between">
                    <input
                      type="number"
                      onChange={editHandler}
                      disabled={order.Bar_type == ""}
                      className="form-control col-5"
                      id="Did the Customer Provide Material  "
                      name="Customer_Material"
                      value={order.Customer_Material}
                    required
                    placeholder="Amount"
                    />
                    <select
                      onChange={editHandler}
                      required
                      value={order.Customer_Material_Weight}
                      name="Customer_Material_Weight"
                      className="custom-select "
                      style={{ width: "148px" }}
                    >
                      <option value="lbs">lbs</option>
                      <option value="grams">grams</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group row">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="Type of Bar"
                >
                  Bags / Bricks <span className="text-danger  "></span>
                </label>
                <div className="col-lg-6">
                  <select
                    onChange={editHandler}
                    name="types_Of_Bar"
                    value={order.types_Of_Bar}
                    required
                    className="custom-select"
                  >
                    <option value="Bags of Chocolates">
                      Bags of Chocolate
                    </option>
                    <option value="Bricks of Chocolates">
                      Bricks of Chocolate
                    </option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                  <label
                    className="col-lg-6 col-form-label"
                    htmlFor="Packaging  "
                  >
                    Packaging{" "}
                  </label>
                  <div className="col-lg-6">
                    <input
                      type="number"
                      className="form-control"
                      onChange={editHandler}
                      id="packaging  "
                      name="packaging"
                      required
                      value={order.packaging}
                      placeholder="Enter a package.."
                    />
                  </div>
                </div>
              <div className="form-group row">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="How much active ingredient does customer want in bar  "
                >
                  How much active ingredient does customer want in bar (grams){" "}
                </label>
                <div className="col-lg-6">
                  <input
                    type="number"
                    disabled={
                      order.Customer_Material == "" ||
                      order.Customer_Material_Weight == "" ||
                      order.types_Of_Bar == ""
                    }
                    className="form-control"
                    onChange={editHandler}
                    id="How much active ingredient does customer want in bar  "
                    name="active_ingredient"
                    required
                    value={order.active_ingredient}
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="Total Number of Bars to be Produced"
                >
                  Total Number of Bars to be Produced(grams){" "}
                </label>
                <div className="col-lg-6">
                  <input
                    type="number"
                    disabled
                    className="form-control"
                    onChange={editHandler}
                    id="Total Number of Bars to be Produced"
                    name="active_ingredient"
                    required
                    value={order.totalBar}
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              <div className="form-group row ">
                <label
                  className="col-lg-6 col-form-label"
                  htmlFor="What FLavors does customer want  "
                >
                  What FLavors does customer want{" "}
                </label>
                <div onClick={newFlavor} className="col-lg-6 cursor-pointer">
                  <div className="bg-info  p-2 w-70 text-white border border-info rounded text-center">
                    Add more FLavors
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-6 col-form-label" htmlFor="Milk">
                  Milk
                </label>
                <div className="col-lg-6">
                  <input
                    onChange={flavorHandler}
                    value={order?.flavorss?.length > 0 &&order?.flavorss[0].price}
                    // value={order?.flavorss?.length > 0 &&order.flavorss[0].price}
                    type="number"
                    className="form-control"
                    id="Milk"
                    name="Milk"
                    required
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-6 col-form-label" htmlFor="White">
                  White
                </label>
                <div className="col-lg-6">
                  <input
                    onChange={flavorHandler}
                    value={order?.flavorss?.length > 0 &&order?.flavorss[1].price}
                    // value={order?.flavorss?.length > 0 &&order.flavorss[1].price}

                    type="number"
                    className="form-control"
                    id="White"
                    required
                    name="White"
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-lg-6 col-form-label" htmlFor="Dark  ">
                  Dark
                </label>
                <div className="col-lg-6">
                  <input
                    onChange={flavorHandler}
                    defaultValue={individualOrder?.flavorss?.length > 0 &&individualOrder?.flavorss[2]?.price}
                    value={order?.flavorss?.length > 0 &&order.flavorss[2].price}
                    type="number"
                    className="form-control"
                    id="Dark"
                    name="Dark"
                    required
                    placeholder="Enter a price in grams.."
                  />
                </div>
              </div>
              {flavor.length > 0 &&
                flavor.map(() => (
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        id="White  "
                        name="White  "
                        placeholder="Enter a flavor name.."
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="number"
                        className="form-control"
                        id="White  "
                        name="White  "
                        placeholder="Enter a flavor amount in grams.."
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="table-responsive">
              <table className="table filtering-table table-responsive-lg d-content " >
                <thead>
                  <tr>
                    <th scope="col">Amount of Chocolate to be used </th>
                    <th scope="col">Bags of Chocolates</th>
                    <th scope="col">Bricks of Chocolates</th>
                    <th scope="col">Active Ingredient</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.flavorss?.length>0 && order.flavorss.map((x) =>
                    isNaN(order.active_ingredient) == false ? (
                      <tr>
                        <td scope="row">{x.name}</td>
                        {order.active_ingredient != "" &&
                        order.types_Of_Bar == "Bags of Chocolates" ? (
                          <td>{x.amount}</td>
                        ) : (
                          <td></td>
                        )}
                        {order.active_ingredient != "" &&
                        order.types_Of_Bar == "Bricks of Chocolates" ? (
                          <td>{x.amount}</td>
                        ) : (
                          <td></td>
                        )}
                        {order.active_ingredient != "" ? (
                          <td>{x.active} gm</td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    ) : (
                      <tr>
                        <td scope="row">{x.name}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
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
    </div>
  </>
  );
};
export default IndividualsOrder;
