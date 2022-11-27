import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../StyleHome.css";
import NavbarBase from "../../../base/NavbarBase/Index";
import logo from "../../../../assets/image/logo.png";
import filter from "../../../../assets/image/filter.png";
import cart from "../../../../assets/image/search.svg";
import Profil from "../../../../assets/image/profil.png";
import bell from "../../../../assets/image/bell (1) 1.png";
import mail from "../../../../assets/image/mail (3) 1.png";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { signOut } from "../../../../configs/redux/actions/userAction";

const Navbar = ({ onChange }) => {
  // const { user } = useSelector((state) => state.auth);
  const [user, setUser] = useState();
  console.log(user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    localStorage.removeItem("id");
    dispatch(signOut());
  };

  useEffect(() => {
    datas();
  }, []);

  const datas = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUser(response.data.data);
  };
  return (
    <div>
      <NavbarBase
        src={logo}
        srcFilter={filter}
        srcCart={cart}
        onChange={onChange}
      ></NavbarBase>
      <nav className="footer-nav bg-light text-center fixed-bottom">
        {user?.id ? (
          <div className="content mt-2 mb-2">
            <button
              className="btn btn-light me-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i className="bi bi-search"></i>
            </button>
            <Link to="/Checkout">
              <button className="btn btn-light me-2">
                <img src={cart} alt="" className="icon-cart m-auto" />
              </button>
            </Link>
            <button className="btn btn-light me-2">
              <img src={bell} alt="" className="icon-cart  m-auto" />
            </button>
            <button className="btn btn-light me-1">
              <img src={mail} alt="" className="icon-cart m-auto" />
            </button>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img
                  src={user.image ? user.image : Profil}
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-circle"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="/login">
                    <button
                      className="btn btn-danger "
                      onClick={() => handleSignOut()}
                      type="button"
                    >
                      logout
                    </button>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/profil">
                    <button className="btn btn-warning">edit profil</button>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>{user.fullname}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <>
            <button className="btn btn-light me-2">
              <i className="bi bi-search "></i>
            </button>
            <a>
              <button className="btn btn-light ">
                <img src={filter} alt="" className="bi bi-cart" />
              </button>
            </a>

            <Link to="/login">
              <button className="btn button-login " type="button">
                {" "}
                login
              </button>
            </Link>
            <a href="./LoginRegister/register.html">
              <button
                type="button"
                className="btn btn-outline-secondary button-signup 3 mb-2"
              >
                {" "}
                sign up
              </button>
            </a>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
