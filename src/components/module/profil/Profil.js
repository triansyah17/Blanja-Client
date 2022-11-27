import React, { useEffect, useState } from "react";
import "./profil.css";
import profil from "../../../assets/image/profilBig.png";
import home from "../../../assets/image/seling-product/home (2) 1.png";
import pekage from "../../../assets/image/seling-product/package 1.png";
import shoping from "../../../assets/image/seling-product/shopping-cart (3) 1.png";
import avatar from "../../../assets/image/edit-avatar.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Profil = ({
  titleOne,
  titleTwo,
  titleThere,
  imgOne,
  imgTwo,
  imgTheree,
  children,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [users, setUser] = useState([]);
  console.log(titleOne);
  console.log(titleTwo);
  console.log(titleThere);
  console.log(imgOne);
  console.log(titleOne);

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
    console.log(response.data.data);
    setUser(response.data.data);
  };
  console.log(users);
  return (
    <div className="col-lg-3 col-sm-3 card pt-sm-0">
      <div className="profil-avatar avatar">
        <table>
          <tbody className="">
            <td className="align-middle float-start ">
              <img
                className="rounded-circle"
                width={70}
                height={65}
                src={users.image ? users.image : profil}
                alt="img"
              />
            </td>
            <td className="align-middle pt-2">
              <p className="ms-2 mb-1">{users.fullname}</p>
              {/* <p className="ms-2">{users.email}</p> */}
              <Link to={'/profil'}>
                <p className=" edit-profil mt-2">
                  <img src={avatar} className="me-2" alt="" />
                  ubah profil
                </p>
              </Link>
            </td>
          </tbody>
        </table>
      </div>
      <div className="profil-select mt-lg-5">
        <nav>
          <div className="nav-tabs " id="nav-tab" role="tablist">
            <button
              className="nav-link"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              <span>
                <button className="btn btn-acount">
                  <img src={imgOne} alt="" />
                </button>
                <Link to="/store">
                  <button
                    className="btn btn-toggle title-dashboard d-inline-flex align-items-center rounded border-0 collapsed text-black"
                    data-bs-toggle="collapse"
                    data-bs-target="#home-collapse"
                    aria-expanded="false"
                  >
                    <span className="text-profil">{titleOne}</span>
                  </button>
                </Link>

                <img src={home} className="img-down" alt="" />
                <div className="collapse show" id="home-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small"></ul>
                </div>
              </span>
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              <span>
                <button className="btn btn-location">
                  <img src={imgTwo} alt="" />
                </button>
                <Link to="/productList">
                  <button
                    className="btn btn-toggle title-dashboard d-inline-flex align-items-center rounded border-0 collapsed text-secondary"
                    data-bs-toggle="collapse"
                    data-bs-target="#dashboard-collapse"
                    aria-expanded="true"
                  >
                    <span className="text-profil">{titleTwo}</span>
                  </button>
                </Link>
                <img src={shoping} className="img-down " alt="" />
                <div className="collapse show" id="dashboard-collapse">
                  {children}
                </div>
              </span>
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              <span>
                <button className="btn btn-mail">
                  <img src={imgTheree} alt="" />
                </button>
                <button
                  className="btn btn-toggle title-dashboard d-inline-flex align-items-center  rounded border-0 collapsed text-secondary"
                  data-bs-toggle="collapse"
                  data-bs-target="#orders-collapse"
                  aria-expanded="false"
                >
                  <span className="text-profil">{titleThere}</span>
                </button>
                <img src={shoping} className="img-down" alt="" />
                <div className="collapse" id="orders-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small"></ul>
                </div>
              </span>
            </button>
          </div>
        </nav>
        <div className="tab-content mt-5" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            tabIndex="0"
          >
            {/* {""} */}
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            tabIndex="0"
          >
            {/* <Pengalaman data={experience} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

Profil.defaultProps = {
  titleOne: "Store",
  titleTwo: "Products",
  titleThere: "Orders",
  imgOne: home,
  imgTwo: pekage,
  imgTheree: shoping,
};
export default Profil;
