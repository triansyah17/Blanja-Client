import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import vektor from "../../assets/image/logo.png";
import blanja from "../../assets/image/Blanja.png";
// import Style from '../auth/style.module.css'
// import PropTypes from "prop-types";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../configs/redux/actions/userAction";
const Register = ({ label, ...props }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "buyer",
  });

  if (auth === user) {
    alert("updsss");
  }
  console.log(user);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      role: "buyer",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signUp(user, navigate));
  };
  if (auth.id) return navigate("/login");

  return (
    <div>
      <div className="form-signin">
        <div className="header-login">
          <Link to="/home">
            <img className="mb-4 text-center" src={vektor} alt="" />
          </Link>
          {/* <img className="mb-4 mt-4 ms-2" src={blanja} alt="" /> */}
          <h1 className="title-login">Please sign up with your account</h1>
          <ul className="nav nav-justified " id="ex1" role="tablist">
            <li className="nav-item active" role="presentation">
              <button className="w-100 btn costemer" type="submit">
                Customer
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <Link to="/registerSeller">
                <button className="w-100 btn selers" type="button">
                  Seller
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-floating">
            <input
              id="floatingInput"
              name="fullname"
              type="text"
              {...props}
              value={user.fullname}
              onChange={handleChange}
              placeholder="Name"
              className="form-control mb-3"
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              id="floatingEmail"
              name="email"
              type="email"
              {...props}
              value={user.email}
              className="form-control mb-3 "
              placeholder="Email Address"
              onChange={handleChange}
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>
          <div className="form-floating">
            <input
              id="floatingPassword"
              name="password"
              type="password"
              {...props}
              className="form-control mt-3 "
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-sign mt-5" type="submit">
            Register
          </button>
          <div className="center-text">
            <label className="login mb-3 mt-4" for="">
              Already Have a Blanja account?
              <Link to="/login" className="page-login">
                Login
              </Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
// Register.propTypes = {
//   label: PropTypes.string.isRequired,
//   id: PropTypes.string,
//   name: PropTypes.string,
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
//   type: PropTypes.string,
//   onChange: PropTypes.func,
// };
export default Register;
