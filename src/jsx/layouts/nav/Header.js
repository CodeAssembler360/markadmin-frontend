import React,{useContext} from "react";
import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

import LogoutPage from './Logout';
/// Image
import profile from "../../../images/profile/pic1.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";

import { ThemeContext } from "../../../context/ThemeContext";

const Header = ({ onNote }) => {
	const {background, changeBackground } = useContext(ThemeContext);
	const handleThemeMode = () => {
		if(background.value === 'dark'){
			changeBackground({ value: "light", label: "Light" });
		}else{
			changeBackground({ value: "dark", label: "Dark" });
		}
	}
	
 
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
				<div className="input-group search-area right d-lg-inline-flex d-none">
					<input type="text" className="form-control" placeholder="Find something here..." />
					<div className="input-group-append">
						<span className="input-group-text"><Link to={"#"}><i className="flaticon-381-search-2"></i></Link></span>
					</div>
				</div>
            </div>
            <ul className="navbar-nav header-right main-notification">
			<li className="nav-item dropdown notification_dropdown">
				<Link to={"#"} className={` nav-link bell dz-theme-mode ${background.value === "light" ? "active" : ""}`}>
					<i id="icon-light" className="fa fa-sun-o" onClick={() => handleThemeMode()}></i>
					<i id="icon-dark" className="fa fa-moon-o" onClick={() => handleThemeMode()}></i>
				</Link>
			</li>
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                  // href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  <img src={profile} width={20} alt="" />
                  <div className="header-info">
                    <span>Johndoe</span>
                    <small>Super Admin</small>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu align="right" className="mt-2">
                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
		{/* <div className="sub-header">
			<div className="d-flex align-items-center flex-wrap mr-auto">
				<h5 className="dashboard_bar">Dashboard</h5>
			</div>
			<div className="d-flex align-items-center">
				<Link to={"#"} className="btn btn-xs btn-primary light mr-1">Today</Link>
				<Link to={"#"} className="btn btn-xs btn-primary light mr-1">Month</Link>
				<Link to={"#"} className="btn btn-xs btn-primary light">Year</Link>
			</div>
		</div> */}
		
      </div>
    </div>
  );
};

export default Header;
