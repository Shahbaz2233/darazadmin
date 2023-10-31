import React from "react";
import navLogo from "../../asset/images/Shoppix-01.png";
import { NavLink, useLocation, } from "react-router-dom";
import { RxHamburgerMenu } from 'react-icons/rx';

const AdminNavbar = () => {
const location = useLocation();

  return (

    <>
      <nav style={{ backgroundColor: "#0e0500" }} className=" navbar navbar-expand-lg nav-cont"  >
        <div className="container nav-box">

          <img
            src={navLogo}
            alt="Logo"
            className="d-inline-block align-text-top shopix"
          />
          {/* <span className="text">HNH TECH SOLUTIONS</span> */}

          <button
            style={{ padding: "1px 7px" }}
            className="navbar-toggler toggle-btn"
            type="btn"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon"> */}
            <RxHamburgerMenu style={{ fontSize: "20px", margin: "auto", color: "white" }} />
            {/* </span> */}
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <div className="input-style">
            </div>
            <ul className="navbar-nav  mx-2 mb-1 mb-lg-0">
              <li className="nav-item mx-3">
                <NavLink
                  className= {location.pathname === "/user"? "btn bg-white active":"btn text-white" }
                  aria-current="page"
                  to="/user">
                  User
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className= {location.pathname === "/categories"? "btn bg-white active":"btn text-white" }
                  aria-current="page"
                  to="/categories">
                  Category
                </NavLink>
                {/* <span className="nav-link" aria-current="page" href="#">
                Category
                </span> */}
              </li>
              <li className="nav-item mx-3">
                <NavLink
                 className= {location.pathname === "/products"? "btn bg-white active":"btn text-white" }
                  aria-current="page"
                  to="/products">
                  Product
                </NavLink>
                {/* <span className="nav-link" aria-current="page" href="#">
                Product
                </span> */}
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className= {location.pathname === "/order"? "btn bg-white active":"btn text-white" }
                  aria-current="page"
                  to="/order">
                  Orders
                </NavLink>
                {/* <span className="nav-link" aria-current="page" href="#">
                Orders
                </span> */}
              </li>
            </ul>

            <button className="ms-2 "
              style={{ borderRadius: "5px" }}
              type="submit">
              <NavLink
                className="btn bg-white"
                to="/">
                Login
              </NavLink>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
