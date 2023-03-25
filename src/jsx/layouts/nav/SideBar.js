/// Menu
import MetisMenu from "metismenujs";
import React, { Component } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import profile from "../../../images/Untitled-1.jpg";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  static contextType = ThemeContext;

  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    // var sidebarBtn = document.querySelector(".side");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      console.log("props==>", this.props);

      hamburgerBtn.classList.toggle("is-active");
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
    // sidebarBtn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    const hamburgerBtn = document.getElementById("hamburger-btn");
    // if (this.props.windowSize < 768) {
    //   btn.addEventListener("click", toggleFunc);
    // } else {
    //   btn.removeEventListener("click", toggleFunc);
    // }

    // function handleWindowResize() {
    //   setWindowSize(getWindowSize());
    // }

    // window.addEventListener('resize', handleWindowResize);

    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    handleheartBlast.addEventListener("click", heartBlast);
  }
  state = {
    loveEmoji: false,
  };
  render() {
    /// Path
    // console.log("set",this.props.setToggle(true))
    const { openMenuToggle } = this.context;
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    /// Active menu
    let dashBoard = [""],
      order = ["ecom-order", "ecom-customerOrder", "ecom-chocolateOrders"],
      app = ["ecom-invoice", "ecom-product-list"],
      shops = ["ecom-invoice", "ecom-customers"],
      menuItem = [
        "ecom-inventory",
        "ecom-inventory-list",
        "ecom-assembly",
        "ecom-assembly-list",
      ],
      accounting = ["ecom-expenses", "ecom-expenses-list"],
      income = ["ecom-invoice", "ecom-income"],
      recipe = ["ecom-recipe", "ecom-recipe-list"],
      shop = [
        "ecom-product-list",
        "ecom-checkout",
        "ecom-invoice",
        "ecom-customers",
      ];
    const togglerHandler = () => {
      console.log("toggler clicked");

      const mainWrapper = document.getElementById("main-wrapper");
      const hamburgerBtn = document.getElementById("hamburger-btn");
      if (this.props.windowSize < 768) {
        mainWrapper.classList.toggle("menu-toggle");
        hamburgerBtn.classList.toggle("is-active");
      } //   this.props.setToggle(!this.props.toggle);
      //   var btn = document.querySelector(".side");
      //   var aaa = document.querySelector("#main-wrapper");
      // function toggleFunc() {
      //   return aaa.classList.toggle("menu-toggle");
      // }
      //   btn.addEventListener("click", toggleFunc);
    };

    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <div className="main-profile">
            <div className="image-bx">
              <img src={profile} alt="" />
              <Link to={"#"}>
                <i className="fa fa-cog" aria-hidden="true"></i>
              </Link>
            </div>
            <h5 className="mb-0 fs-20 text-black ">
              <span className="font-w400">Hello,</span> Marquez
            </h5>
            <p className="mb-0 fs-14 font-w400">marquezzzz@mail.com</p>
          </div>
          <MM className="" id="menu">
            <li className="nav-label first">Main Menu</li>
            <li className={`${dashBoard.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon metismenu " to="#">
                <i className="flaticon-144-layout"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              <ul>
                <li onClick={togglerHandler} className="side">
                  <Link className={`${path === "" ? "mm-active" : ""}`} to="/">
                    Dashboard{" "}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${app.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon metismenu" to="#">
                <i className="flaticon-144-layout"></i>
                <span className="nav-text">Product</span>
              </Link>
              <ul>
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${
                      path === "ecom-product-list" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-list"
                  >
                    Product
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${order.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon metismenu" to="#">
                <i className="flaticon-144-layout"></i>
                <span className="nav-text">Orders</span>
              </Link>
              <ul>
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${
                      path === "ecom-customerOrder" ? "mm-active" : ""
                    }`}
                    to="/ecom-customerOrder"
                  >
                    Chocolate Order
                  </Link>
                </li>
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${
                      path === "ecom-chocolateOrders" ? "mm-active" : ""
                    }`}
                    to="/ecom-chocolateOrders"
                  >
                    Order List
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${accounting.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon metismenu" to="#">
                <i className="flaticon-144-layout"></i>
                <span className="nav-text">Accounting</span>
              </Link>
              <ul>
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${path === "ecom-expenses" ? "mm-active" : ""}`}
                    to="/ecom-expenses"
                  >
                    Expenses
                  </Link>
                </li>
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${
                      path === "ecom-expenses-list" ? "mm-active" : ""
                    }`}
                    to="/ecom-expenses-list"
                  >
                    Expenses List
                  </Link>
                </li>
                {/* <li className={`${income.includes(path) ? "mm-active" : ""}`}>
                  <Link className="has-arrow ai-icon metismenu" to="#">
                    <span className="nav-text">Income</span>
                  </Link>
                  <ul>
                    <li onClick={togglerHandler} className="side">
                      <Link
                        className={`${
                          path === "ecom-invoice" ? "mm-active" : ""
                        }`}
                        to="/ecom-invoice"
                      >
                        Invoice Income
                      </Link>
                    </li>
                    <li onClick={togglerHandler} className="side">
                      <Link
                        className={`${
                          path === "ecom-income" ? "mm-active" : ""
                        }`}
                        to="/ecom-income"
                      >
                        Other Income
                      </Link>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </li>
            <li
              onClick={togglerHandler}
              className={`side ${recipe.includes(path) ? "mm-active" : ""}`}
            >
              <Link className="has-arrow ai-icon metismenu" to="#">
                <i className="flaticon-144-layout"></i>
                <span className="nav-text">Recipe</span>
              </Link>
              <ul>
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={` ai-icon ${
                      path === "ecom-recipe" ? "mm-active" : ""
                    }`}
                    to="/ecom-recipe"
                  >
                    <i className="flaticon-144-layout"></i>
                    <span className="nav-text">New Recipe</span>
                  </Link>
                </li>
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={` ai-icon ${
                      path === "ecom-recipe-list" ? "mm-active" : ""
                    }`}
                    to="/ecom-recipe-list"
                  >
                    <i className="flaticon-144-layout"></i>
                    <span className="nav-text">Recipe List</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${menuItem.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon metismenu" to="#">
                <i className="flaticon-144-layout"></i>
                <span className="nav-text">Inventory</span>
              </Link>
              <ul>
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${
                      path === "ecom-inventory" ? "mm-active" : ""
                    }`}
                    to="/ecom-inventory"
                  >
                    Inventory Ingredients
                  </Link>
                </li>
                {/* <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${
                      path === "ecom-inventory-list" ? "mm-active" : ""
                    }`}
                    to="/ecom-inventory-list"
                  >
                    Ingredient List
                  </Link>
                </li> */}
                <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${path === "ecom-assembly" ? "mm-active" : ""}`}
                    to="/ecom-assembly"
                  >
                    Inventory Items
                  </Link>
                </li>
                {/* <li onClick={togglerHandler} className="side">
                  <Link
                    className={`${
                      path === "ecom-assembly-list" ? "mm-active" : ""
                    }`}
                    to="/ecom-assembly-list"
                  >
                    Item List
                  </Link>
                </li> */}
              </ul>
            </li>
            <li
              onClick={togglerHandler}
              className={`side ${shops.includes(path) ? "mm-active" : ""}`}
            >
              <Link
                className={` ai-icon ${
                  path === "ecom-customers" ? "mm-active" : ""
                }`}
                to="/ecom-customers"
              >
                <i className="flaticon-144-layout"></i>
                <span className="nav-text">Customer</span>
              </Link>
            </li>
          </MM>
          <div className="copyright">
            <p>
              <strong>Zenix Crypto React Admin Dashboard</strong> © 2022 All
              Rights Reserved
            </p>
            <p className="fs-12">
              Made with <span className="heart"></span> by DexignZone
            </p>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
