import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactByIdAction, getContactsAction, updateContactAction } from "../../../../../store/actions/CustomerAction";

const CustomerDetails = ({id,setId}) => {
    const [data,setData]=useState({})
    const dispatch=useDispatch()
    const {individualContact}=useSelector(state=>state.contacts)
    useEffect(()=>{
        dispatch(getContactByIdAction(id))
    },[id])
    useEffect(()=>{
        setData(individualContact)
    },[individualContact])
    useEffect(()=>{
      if(typeof(data.PhoneNumber)!="undefined"  ){
        if(data.PhoneNumber!=""){
          setData({
            ...data,
            AccountNumber:"XXX-"+data.PhoneNumber.slice(-4),
          })
        }
        else{
          setData({
            ...data,
            AccountNumber:"",
          })
        }   
      }

    },[data.PhoneNumber])
    const editHandler=(e)=>{
      if(e.target.name=="Checkbox"){
        if(e.target.checked===true){
          setData({
            ...data,
            AddressLine1:data.BillingAddressLine1,
            AddressLine2:data.BillingAddressLine2,
            AddressLine3:data.BillingAddressLine3
          })
        }
      }

      else{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
      }
    }
    const routeChange=()=>{
      setId('')
      dispatch(getContactsAction())
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(updateContactAction(data,routeChange))

    }
  return (
    <Fragment>
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
                          htmlFor="ContactName"
                        >
                          ContactName <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.ContactName}
                          onChange={editHandler}
                            type="text"
                            className="form-control"
                            id="ContactName"
                            name="ContactName"
                            placeholder="Enter a contact name.."
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="EmailAddress"
                        >
                          Email Address
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.EmailAddress}
                            onChange={editHandler}
                            className="form-control"
                            id="EmailAddress"
                            name="EmailAddress"
                            placeholder="Enter a email address.."
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="FirstName"
                        >
                          First Name
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.FirstName}
                            onChange={editHandler}
                            type="text"
                            className="form-control"
                            id="FirstName"
                            name="FirstName"
                            placeholder="Enter a first name"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="LastName"
                        >
                          Last Name <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.LastName}
                            className="form-control"
                            id="LastName"
                            name="LastName"
                            placeholder="Enter a last name"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="AccountNumber"
                        >
                          AccountNumber <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.AccountNumber}
                            className="form-control"
                            id="AccountNumber"
                            name="AccountNumber"
                            disabled
                            placeholder="Enter a AccountNumber"
                          />
                        </div>
                      </div> 
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="PhoneNumber"
                        >
                          PhoneNumber <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.PhoneNumber}
                            className="form-control"
                            id="PhoneNumber"
                            name="PhoneNumber"
                            placeholder="Enter a PhoneNumber"
                          />
                        </div>
                      </div> <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="Mailto"
                        >
                          Mailto <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.Mailto}
                            className="form-control"
                            id="Mailto"
                            name="Mailto"
                            placeholder="Enter a Mailto"
                          />
                        </div>
                      </div> 
                      <div className="form-group row d-flex">
                        <div className="pl-3">
                          <input
                            type="checkbox"
                            onChange={editHandler}
                            // defaultValue={data.AccountNumber}
                            className=""
                            defaultChecked=''
                            id="CheckboX"
                            name="Checkbox"
                          />
                        </div>
                        <label
                          className="pl-3"
                          htmlFor="Same as billing Address"
                        >
                          Same as billing Address <span className="text-danger"></span>
                        </label>
                      </div> 
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="AddressLine1"
                        >
                          AddressLine1 <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.AddressLine1}
                          onChange={editHandler}
                            type="text"
                            className="form-control"
                            id="AddressLine1"
                            name="AddressLine1"
                            placeholder="Enter a AddressLine1.."
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="AddressLine2"
                        >
                          AddressLine2
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.AddressLine2}
                            onChange={editHandler}
                            className="form-control"
                            id="AddressLine2"
                            name="AddressLine2"
                            placeholder="Enter a AddressLine2.."
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="AddressLine3"
                        >
                          AddressLine3
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.AddressLine3}
                            onChange={editHandler}
                            type="text"
                            className="form-control"
                            id="AddressLine3"
                            name="AddressLine3"
                            placeholder="Enter a AddressLine3"
                          />
                        </div>
                      </div>
                        <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="City"
                        >
                          City <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.City}
                            className="form-control"
                            id="City"
                            name="City"
                            placeholder="Enter a city"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      {/* //{col2} */}
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="State"
                        >
                          State
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            onChange={editHandler}
                            defaultValue={data.State}
                            className="form-control"
                            id="State"
                            name="State"
                            placeholder="Enter a State.."
                          />
                        </div>
                      </div>     
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="Zip"
                        >
                          Zip
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.Zip}
                            className="form-control"
                            id="Zip"
                            name="Zip"
                            placeholder="Enter a zip code"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="Country"
                        >
                          Country
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            onChange={editHandler}
                            defaultValue={data.Country}
                            className="form-control"
                            id="Country"
                            name="Country"
                            placeholder="Enter a country.."
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="BillingMailTo"
                        >
                          Billing Mailto <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.BillingMailTo}
                            className="form-control"
                            id="BillingMailTo"
                            name="BillingMailTo"
                            placeholder="Enter a BillingMailTo"
                          />
                        </div>
                      </div> 
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="BillingAddressLine1"
                        >
                          Billing AddressLine1 <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.BillingAddressLine1}
                          onChange={editHandler}
                            type="text"
                            className="form-control"
                            id="BillingAddressLine1"
                            name="BillingAddressLine1"
                            placeholder="Enter a BillingAddressLine1.."
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="BillingAddressLine2"
                        >
                          Billing AddressLine2
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.BillingAddressLine2}
                            onChange={editHandler}
                            className="form-control"
                            id="BillingAddressLine2"
                            name="BillingAddressLine2"
                            placeholder="Enter a BillingAddressLine2.."
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="BillingAddressLine3"
                        >
                          Billing AddressLine3
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                          defaultValue={data.BillingAddressLine3}
                            onChange={editHandler}
                            type="text"
                            className="form-control"
                            id="BillingAddressLine3"
                            name="BillingAddressLine3"
                            placeholder="Enter a BillingAddressLine3"
                          />
                        </div>
                      </div>
                        <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="BillingCity"
                        >
                          Billing City <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.BillingCity}
                            className="form-control"
                            id="BillingCity"
                            name="BillingCity"
                            placeholder="Enter a Billingcity"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="BillingState"
                        >
                          Billing State
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            onChange={editHandler}
                            defaultValue={data.BillingState}
                            className="form-control"
                            id="BillingState"
                            name="BillingState"
                            placeholder="Enter a BillingState.."
                          />
                        </div>
                      </div>     
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="BillingZip"
                        >
                          Billing Zip
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            onChange={editHandler}
                            defaultValue={data.BillingZip}
                            className="form-control"
                            id="BillingZip"
                            name="BillingZip"
                            placeholder="Enter a Billingzip code"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="BillingCountry"
                        >
                          Billing Country
                          <span className="text-danger"></span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            onChange={editHandler}
                            defaultValue={data.BillingCountry}
                            className="form-control"
                            id="BillingCountry"
                            name="BillingCountry"
                            placeholder="Enter a Billingcountry.."
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

export default CustomerDetails;
