/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./edit.css";
import avatar from "../../../assets/image/profil-avatar.png";
import Profil from "./Profil";
import home from "../../../assets/image/user-profil.png";
import pekage from "../../../assets/image/seling-product/package 1.png";
import shoping from "../../../assets/image/clipboard 1 (1).png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../configs/redux/actions/userAction";

const EditProfil = () => {
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [phonenumber, setPhonenumber] = useState(+628000000);
  const [gender, setGender] = useState("");
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Now loading",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    e.preventDefault();
    const data = new FormData();
    data.append("phonenumber", phonenumber);
    data.append("fullname", name);
    data.append("gender", gender);
    data.append("email", email);
    data.append("image", image);
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_BACKEND}auth/updateImg`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res);
        dispatch(updateUser(res));
        navigate("/profil");
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate users",
          text: `username : ${name}`,
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
            datas();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "data yang anda inputkan salah",
        });
        console.log(err);
      });
  };

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
    const result = response.data.data;
    setName(result.fullname);
    setImagePreview(result.image);
    setImage(result.image || avatar);
    setPhonenumber(result.phonenumber || phonenumber);
    setGender(result.gender);
    setEmail(result.email);
  };
  useEffect(() => {
    datas();
  }, []);
  return (
    <div className="row container1">
      <Profil
        titleOne="My Account"
        titleTwo="My product"
        titleThere="My order"
        imgOne={home}
        imgTwo={pekage}
        imgTheree={shoping}
      />
      <div className="col-lg-9 profile-form pt-5">
        <div className="card card-form">
          <div className="card-body">
            <h3 className="title-profil">My Profile</h3>
            <p className="sub-profil text-secondary">
              Manage your profile information
            </p>
            <hr />
            <form action="" onSubmit={onSubmit}>
              <div className="row">
                <div className="col-sm-9">
                  <div className="mb-3 mt-1 row">
                    <label
                      htmlFor="Name"
                      className="col-sm-3 col-form-label text-end text-form"
                    >
                      Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <label
                      htmlFor="email"
                      className="col-sm-3 col-form-label text-end text-form"
                    >
                      Email
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <label
                      htmlFor="phoneNumber"
                      className="col-sm-3 col-form-label text-end text-form"
                    >
                      Phone number
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        name="phone_number"
                        className="form-control"
                        id="inputPassword"
                      />
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <label
                      htmlFor="gender"
                      className="col-sm-3 col-form-label text-end text-form"
                    >
                      Gender
                    </label>
                    <div className="col-sm-8">
                      <input
                        className="form-check-input active"
                        type="radio"
                        name="laki-laki"
                        value="laki-laki"
                        checked={gender === "laki-laki"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label
                        className="form-check-label text-secondary ms-2"
                        htmlFor="flexRadioDefault1"
                      >
                        <span className="fs-6">laki-laki</span>
                      </label>
                      <input
                        className="form-check-input ms-4"
                        type="radio"
                        name="perempuan"
                        value="perempuan"
                        checked={gender === "perempuan"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label
                        className="form-check-label text-secondary ms-2"
                        htmlFor="flexRadioDefault1 "
                      >
                        <span className="fs-6">perempuan</span>
                      </label>
                    </div>
                  </div>
                  {/* <div className="mb-4 row">
                      <label
                        htmlFor="inputPassword"
                        className="col-sm-3 col-form-label text-end text-form"
                      >
                        Date of birth
                      </label>
                      <div className="col-sm-6">
                        <input
                          value={date_of_brith}
                          onChange={(e) => setDate_of_brith(e.target.value)}
                          id="startDate"
                          className="form-control"
                          type="date"
                        />
                      </div>
                    </div> */}
                  <div className="mb-3 row">
                    <div className="col-sm-9">
                      <button
                        type="submit"
                        className="btn btn-submit"
                        onClick={onSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 image-profil text-center">
                  <img
                    src={imagePreview ? imagePreview : avatar}
                    className="rounded-circle imagas-profile"
                    alt=""
                  />
                  <div className="select-avatar mt-3">
                    <div className="fileUpload btn btn-light btn-select-profil appp">
                      <span>Choase File</span>
                      <input
                        onChange={(e) => onImageUpload(e)}
                        names="photo"
                        type="file"
                        className="upload"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfil;
