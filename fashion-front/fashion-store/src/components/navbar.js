import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
// import logo from "../images/logo.jpg";
import logo from "../images/file.png";


function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);

  return (
    <nav className="navbar navbar-expand-lg shadow  mb-5 rounded">
      <Link to="/dash" className="navbar-brand" style={{color:'white'}}>
        <img src={logo} alt="logo" height="50px" width="120px" />
      </Link>

      {/* <i className="fa-solid fa-pizza-slice" style={{color:'white'}}></i> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div style={{color:'white'}}>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active" >
            <Link to="/dash" className="nav-link" style={{color:'white'}}>
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" style={{color:'white'}}>
              Login
            </Link>
          </li>
          <li className="nav-item">

            <Link to="/cart" className="nav-link" style={{color:'white'}}>
              Cart {cartstate?.cartItems?.length}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link" style={{color:'white'}}>
              Disabled
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link" style={{color:'white'}}>
              Wishlist
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/outfits" className="nav-link" style={{color:'white'}}>
              Outfits
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/place-orders" className="nav-link" style={{color:'white'}}>
              Orders
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/" className="nav-link" style={{color:'white'}}>
             Items
            </Link>
          </li>
         
          <li className="nav-item">
            <Link to="/show-tailors" className="nav-link" style={{color:'white'}}>
           Tailors
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/displaycurabus" className="nav-link" style={{color:'white'}}>
            About Us

            </Link>
          </li>
          <li className="nav-item">
            {/* <Link to="/displaycurabus" className="nav-link" style={{color:'white'}}> */}
            <a href="http://128.199.88.94" className="nav-link" style={{color:'white'}}>
            Blog</a>

            {/* </Link> */}
          </li>


          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ color: "white" }}
            >
              More
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/register" className="dropdown-item">
                Disabled
              </Link>
              <Link to="/wishlist" className="dropdown-item">
                Wishlist
              </Link>
              <Link to="/outfits" className="dropdown-item">
                Outfits
              </Link>
              <Link to="/place-orders" className="dropdown-item">
                Orders
              </Link>
              <Link to="/" className="dropdown-item">
                Items
              </Link>
              <Link to="/show-tailors" className="dropdown-item">
                Tailors
              </Link>
            </div>
          </li> */}
          
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
