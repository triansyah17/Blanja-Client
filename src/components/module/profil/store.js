import React, { useState, useEffect } from "react";
import "./edit.css";
import avatar from "../../../assets/image/profil-avatar.png";
import Profil from "./Profil";
import home from "../../../assets/image/user-profil.png";
import pekage from "../../../assets/image/map-pin (3) 1.png";
import shoping from "../../../assets/image/clipboard 1 (1).png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Store() {
  const [dataToko, setDataToko] = useState([])
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formToko, setFormToko] = useState({

  })
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
  };

  const fetchToko = async() =>{
    const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}toko/${localStorage.getItem('id')}`)
    setDataToko(result.data.data[0])

  }
  console.log(dataToko)
  useEffect(() =>{
    fetchToko()
  }, [])
  return (
    <div className="row">
      <Profil>
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1  small ">
            <li>
              <Link
                to="/productlist"
                className="link-dark d-inline-flex text-decoration-none rounded ms-5 mt-2"
              >
                myProduct
              </Link>
            </li>
            <li>
              <Link
                to="/selling"
                className="link-dark d-inline-flex text-decoration-none rounded ms-3 mt-3 text-secondary"
              >
                selling
              </Link>
            </li>
          </ul>
        </Profil>
      <div className="col-lg-9 profile-form py-5">
        <div className="card card-form">
          <div className="card-body">
            <h3 className="title-profil">My Profile Store</h3>
            <p className="sub-profil text-secondary">
              Manage your profile information
            </p>
            <hr />
            <form action="">
              <div className="row">
                <div className="col-sm-9">
                  <div className="mb-3 mt-1 row">
                    <label
                      htmlFor="Name"
                      className="col-sm-3 col-form-label text-end text-form"
                    >
                      Store name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        value={dataToko.name}
                        // onChange={(e) => setName(e.target.value)}
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
                        value={dataToko.email}
                        // onChange={(e) => setEmail(e.target.value)}
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
                        value={dataToko.phonenumber}
                        // onChange={(e) => setPhonenumber(e.target.value)}
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
                      Store description
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        className="form-control card-desription"
                        id="floatingEmail"
                        name="description"
                        type="description"
                        value={dataToko.description}
                        // onChange={(e) => setDeskripsion(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <div className="col-sm-9">
                      <button
                        type="submit"
                        className="btn btn-submit bg-success"
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
}
