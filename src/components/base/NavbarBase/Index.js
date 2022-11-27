import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../configs/redux/actions/userAction";
import cart from "../../../assets/image/search.svg";
import Profil from "../../../assets/image/profil.png";
import bell from "../../../assets/image/bell (1) 1.png";
import mail from "../../../assets/image/mail (3) 1.png";
import { Dropdown, DropdownButton } from "react-bootstrap";
import swal from "sweetalert2";
import axios from "axios";
import "./style.css"
import "../../module/home/StyleHome.css"
import ModalFilter from "../modal/ModalFilter";
const NavbarBase = ({ onChange, onClick, src, srcCart }) => {
  const [user, setUser] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  const handleSignOut = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(signOut());
    swal.fire({
      icon: "success",
      title: `Good Bye!!`,
    });
  };

// const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState([]);
  const handleSearch = () => {
      navigate({
      pathname: "/myProducts",
      search: "?search=" + search ,
    });
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
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container">
        <Link to="/home">
          <img src={src} alt="" className="" />
        </Link>
        <div className="collapse navbar-collapse ms-auto " id="navbarCollapse">
          <ul className="navbar-nav mb-2 mb-md-0 w-50 me-auto">
            <div className="input-group rounded nav-search">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <span
                className="input-group-text search bg-light"
                id="search-addon"
              >
                <i className="bi bi-search" onClick={handleSearch}></i>
              </span>
            </div>
            <button className="btn filter">
                <ModalFilter />
            </button>
          </ul>
          {user?.id ? (
            <>
              <form className="ms-4">
                <Link to="/Checkout">
                  <button
                    className="btn btn-link position-relative mb-1"
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  >
                    <img src={cart} alt="" className="icon-cart mb-2" />
                    {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {data.cart.length}
                    </span> */}
                  </button>
                </Link>
                <img src={bell} alt="" className="icon-cart ms-2 mb-2" />
                <img src={mail} alt="" className="icon-cart ms-2 me-2 mb-1" />
              </form>
              <DropdownButton
                align="end"
                title={
                  <img
                    src={user.image ? user.image : Profil}
                    alt=""
                    width={35}
                    height={35}
                    className="rounded-circle"
                  />
                }
                variant="link"
                id="dropdown-menu-align-end"
              >
                <Dropdown.Item variant="link">
                  {" "}
                  <p className="text-center m-auto">{user.fullname}</p>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item variant="secondary" eventKey="4">
                  {" "}
                  <Link to="/profil"> Profil</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4" variant="danger">
                  <Link to="/login" onClick={() => handleSignOut()}>
                    Logout
                  </Link>
                </Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            <>
              
              <Link to="/login">
                <button className="btn button-login " type="button">
                  {" "}
                  login
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="btn btn-outline-secondary button-signup 3 mb-2"
                >
                  {" "}
                  sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
// }
export default NavbarBase;
