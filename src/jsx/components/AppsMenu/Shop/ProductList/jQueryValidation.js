import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import PageTitle from "../../../../layouts/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProductByIdAction, updateProductAction } from "../../../../../store/actions/ProductAction";

const JQueryValidation = () => {
    const [data,setData]=useState({})
    const param=useParams()
    const history=useHistory()
    const dispatch=useDispatch()
    const {individualProduct}=useSelector(state=>state.products)
    useEffect(()=>{
        dispatch(getProductByIdAction(param.id))
    },[])
    useEffect(()=>{
        setData(individualProduct)
    },[individualProduct])

    const editHandler=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const routeChange=()=>{
      history.push('/ecom-product-list')
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(updateProductAction(data,routeChange))

    }
  return (
    <Fragment>
      <PageTitle
        activeMenu="Details"
        motherMenu="ProductList"
        pageContent="Validation"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Product Details</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  onSubmit={submitHandler}
                >
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="itemCode"
                        >
                          Item Code
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.itemCode}
                            type="text"
                            className="form-control"
                            id="itemCode"
                            name="itemCode"
                            placeholder="Enter a item code.."
                            onChange={editHandler}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="itemName"
                        >
                          Item Name <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.itemName}
                          onChange={editHandler}
                            type="text"
                            className="form-control"
                            id="itemName"
                            name="itemName"
                            placeholder="Enter a item name.."
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="purchasesDescription"
                        >
                          Purchases Description
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                          defaultValue={data.purchasesDescription}
                            onChange={editHandler}
                            rows="5"
                            className="form-control"
                            id="purchasesDescription"
                            name="purchasesDescription"
                            placeholder="Enter a purchases description.."
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="purchasesUnitPrice"
                        >
                          Purchases UnitPrice
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.purchasesUnitPrice}
                            onChange={editHandler}
                            type="text"
                            className="form-control"
                            id="purchasesUnitPrice"
                            name="purchasesUnitPrice"
                            placeholder="Enter a purchases unit price"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="purchasesAccount"
                        >
                          Purchases Account <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.purchasesAccount}
                            className="form-control"
                            id="purchasesAccount"
                            name="purchasesAccount"
                            placeholder="Enter a purchases account"
                          />
                        </div>
                      </div>
                        <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="purchasesTaxRate"
                        >
                          Purchases TaxRate <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.purchasesTaxRate}
                            className="form-control"
                            id="purchasesTaxRate"
                            name="purchasesTaxRate"
                            placeholder="Enter a purchases tax rate"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                    <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="salesDescription"
                        >
                          Sales Description
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            rows="5"
                            onChange={editHandler}
                            defaultValue={data.salesDescription}
                            className="form-control"
                            id="salesDescription"
                            name="salesDescription"
                            placeholder="Enter a sales description.."
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="salesUnitPrice"
                        >
                          Sales UnitPrice
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.salesUnitPrice}
                            className="form-control"
                            id="salesUnitPrice"
                            name="salesUnitPrice"
                            placeholder="Enter a sales unit price"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="salesAccount"
                        >
                          Sales Account <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.salesAccount}
                            className="form-control"
                            id="salesAccount"
                            name="salesAccount"
                            placeholder="Enter a sales account"
                          />
                        </div>
                      </div>
                        <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="salesTaxRate"
                        >
                          Sales TaxRate <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.salesTaxRate}
                            className="form-control"
                            id="salesTaxRate"
                            name="salesTaxRate"
                            placeholder="Enter a sales tax rate"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="inventoryAssetsAccount"
                        >
                          Inventory Asset Account <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.inventoryAssetsAccount}
                            className="form-control"
                            id="inventoryAssetsAccount"
                            name="inventoryAssetsAccount"
                            placeholder="Enter a inventory asset account"
                          />
                        </div>
                      </div>
                        <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="costOfGoodsSoldAccount"
                        >
                          Cost Of Goods Sold Account <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.costOfGoodsSoldAccount}
                            className="form-control"
                            id="costOfGoodsSoldAccount"
                            name="costOfGoodsSoldAccount"
                            placeholder="Enter a cost of goods sold account"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-lg-8 ml-auto">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default JQueryValidation;
