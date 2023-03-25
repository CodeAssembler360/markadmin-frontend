import React, { useContext } from "react";

/// React router dom
import { Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./pages/ScrollToTop";

/// Dashboard
import Home from "./components/Dashboard/Home";
//
////Theme
import DashboradLight from "./components/Dashboard/Demo/DashboradLight";
import Theme1 from "./components/Dashboard/Demo/Theme1";
import Theme2 from "./components/Dashboard/Demo/Theme2";
import Theme3 from "./components/Dashboard/Demo/Theme3";
import Theme4 from "./components/Dashboard/Demo/Theme4";
import Theme5 from "./components/Dashboard/Demo/Theme5";
import Theme6 from "./components/Dashboard/Demo/Theme6";
import Theme7 from "./components/Dashboard/Demo/Theme7";
import Theme8 from "./components/Dashboard/Demo/Theme8";

/// Product List
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";
import CustomerDetails from "./components/AppsMenu/Shop/Customers/CustomerDetails";

import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import JQueryValidation from "./components/AppsMenu/Shop/ProductList/jQueryValidation";
import Order from "./components/AppsMenu/Shop/Orders/Order";
import Customer from "./components/AppsMenu/Shop/Orders/Customer";
import ChocolateList from "./components/AppsMenu/Shop/ChocolateOrderList/ChocolateList";
import IndividualsOrder from "./components/AppsMenu/Shop/ChocolateOrderList/IndividualsOrder";
import ChocolateOrder from "./components/AppsMenu/Shop/ChocolateOrderList/ChocolateOrder";
import Inventory from "./components/AppsMenu/MenuItem/Inventory/index";
import Assembly from "./components/AppsMenu/MenuItem/Assembly/index";
import Expenses from "./components/AppsMenu/Shop/Accounting/Expenses";
import Recipe from "./components/AppsMenu/Shop/Recipe/Recipe";
import InventoryTable from "./components/AppsMenu/MenuItem/Inventory/InventoryTable";
import ItemList from "./components/AppsMenu/MenuItem/Assembly/ItemList";
import ExpensesList from "./components/AppsMenu/Shop/Accounting/ExpensesList";
import RecipeTable from "./components/AppsMenu/Shop/Recipe/RecipeTable";
import IndividualRecipe from "./components/AppsMenu/Shop/Recipe/IndividualRecipe";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);

  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },

    //themes
    { url: "dashboard-light", component: DashboradLight },
    { url: "dark-sidebar", component: Theme1 },
    { url: "modern-sidebar", component: Theme2 },
    { url: "horizontal-sidebar", component: Theme3 },
    { url: "compact-sidebar", component: Theme4 },
    { url: "icon-hover", component: Theme5 },
    { url: "mini-sidebar", component: Theme6 },
    { url: "dark-mini", component: Theme7 },
    { url: "full-sidebar", component: Theme8 },

    /// Shop
    { url: "ecom-product-list", component: ProductList },
    { url: "product-detail/:id", component: JQueryValidation },
    { url: "ecom-checkout", component: Checkout },
    { url: "ecom-invoice", component: Invoice },
    { url: "ecom-customers", component: Customers },
    { url: "ecom-customerOrder", component: Customer },
    { url: "ecom-customerOrder/:id", component: Order },
    { url: "ecom-chocolateOrders", component: ChocolateList },
    { url: "ecom-chocolateOrders/:id", component: ChocolateOrder },
    { url: "ecom-chocolateOrders/:id/:id", component: IndividualsOrder },
    { url: "ecom-order", component: Order },
    { url: "customer-detail/:id", component: CustomerDetails },
    //MenuItem
    { url: "ecom-inventory", component: Inventory },
    { url: "ecom-inventory-list", component: InventoryTable },
    { url: "ecom-assembly", component: Assembly },
    { url: "ecom-assembly-list", component: ItemList },
    //Accounting
    { url: "ecom-expenses", component: Expenses },
    { url: "ecom-expenses-list", component: ExpensesList },
    //Recipe
    { url: "ecom-recipe", component: Recipe },
    { url: "ecom-recipe-list", component: RecipeTable },
    { url: "ecom-recipe-list/:id", component: IndividualRecipe },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");

  setTimeout(function () {
    var btn = document.querySelector("#main-wrapper");
    var metisMenu = document.querySelector(".metismenu");
    metisMenu.addEventListener("mouseenter", toggleFunc1);
    metisMenu.addEventListener("mouseleave", toggleFunc2);

    function toggleFunc1() {
      return btn.classList.add("iconhover-toggle");
    }
    function toggleFunc2() {
      return btn.classList.remove("iconhover-toggle");
    }
  }, 200);
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <Setting />
      <ScrollToTop />
    </>
  );
};

export default Markup;
