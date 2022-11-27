import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styleCreate.css";
import Profil from "../profil/Profil";
import { useNavigate } from "react-router-dom";
import Input from "../../base/Input/Input";
import deskripsi from "../../../assets/image/seling-product/summernote.png";
// import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import createProducts from "../../../configs/redux/actions/createProduct";
import Swal from "sweetalert2";
// import { createProduct } from "../../../configs/redux/actions/productsActions";
const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDeskripsion] = useState("");
  const [stock, setStock] = useState("");
  const [merk, setMerk] = useState("");
  const [price, setPrice] = useState("");
  const [typestock, setTypestock] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    merk: "",
    stock: null,
    price: null,
    condition: null,
    category: null,
    description: "",
  });
  console.log(form);

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const { isLoading } = useSelector((state) => state.Createproducts);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const fetchCategory = async () => {
    const api = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}category/all`
    );
    const categorys = api.data.data;
    console.log(categorys);
    let result = categorys.map((res) => {
      return {
        label: res.name,
        value: res.id,
      };
    });
    setCategorys(result);
  };
  console.log(categorys);
  // console.log(options)
  const onSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Now loading",
      allowEscapeKey: false,
      imageUrl: "images/ajaxloader.gif",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    dispatch(createProducts(form, image, setShow));
  };
  const onImageUpload = (e) => {
    let url = [];
    const file = e.target.files;
    for (let gg of file) {
      console.log(gg);
      url.push(URL.createObjectURL(gg));
    }
    setImage(file);
    setImagePreview(url);
    setLoading(false);
    console.log(url);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  console.log(imagePreview);
  return (
    <form onSubmit={onSubmit}>
      <div className="row container-custom">
        <Profil>
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1  small">
            <li>
              <Link
                to="/productlist"
                className="link-dark d-inline-flex text-decoration-none ms-5 mt-2"
              >
                myProduct
              </Link>
            </li>
            <li>
              <Link
                to="/selling"
                className="link-dark d-inline-flex text-decoration-none ms-2 mt-3 text-secondary"
              >
                selling
              </Link>
            </li>
          </ul>
        </Profil>
        <div className="col-lg-7 col-sm-3 pb-5 mt-5">
          <div className="card ms-lg-4">
            <div className="card-body">
              <h3 className="title-selling mt-2">Inventory</h3>
              <div className="line"></div>
              <div className="row mt-3 ms-1">
                <div className="col-sm-8">
                  <div className="mb-3">
                    <label
                      htmlFor="Name"
                      className="col-sm-4 col-form-label text-secondary fs-5"
                    >
                      <>Name of goods</>
                    </label>
                    <Input
                      id="floatingInput"
                      placeholder="masukan nama"
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3 ms-lg-4">
            <div className="card-body">
              <h3 className="title-selling mt-2 fs-5">Item details</h3>
              <div className="line"></div>
              <div className="row mt-3 ms-1">
                <div className="col-sm-8">
                  <div className="mb-3 row">
                    <label
                      htmlFor="Name"
                      className="col-sm-4 col-form-label text-secondary fs-5"
                    >
                      Unit price
                    </label>
                    <Input
                      name="price"
                      type="number"
                      placeholder="price"
                      onChange={handleChange}
                      className="form-control form-control-lg ms-2 mt-2 name-input"
                    />
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="Merk"
                      className="col-sm-4 col-form-label text-secondary fs-5"
                    >
                      Unit Merk
                    </label>
                    <Input
                      name="merk"
                      placeholder="merk"
                      onChange={handleChange}
                      className="form-control form-control-lg ms-2 mt-2 name-input"
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="mb-3 row">
                    <label
                      htmlFor="Name"
                      className="col-sm-4 col-form-label text-secondary fs-5"
                    >
                      Stock
                    </label>
                    <Input
                      id="floatingPassword"
                      name="stock"
                      type="number"
                      placeholder="Stock"
                      onChange={handleChange}
                      className="form-control form-control-lg ms-2 mt-2 name-input"
                    />
                  </div>
                </div>
                <div className="col-sm-8 mt-3 mb-4">
                  <label
                    htmlFor="Name"
                    className="col-sm-12 col-form-label ms-2 mb-2 text-secondary fs-5"
                  >
                    Condition
                  </label>
                  <div className="stock-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="typestock"
                      value="baru"
                      onClick={(e) =>
                        setForm({ ...form, condition: e.target.value })
                      }
                    />
                    <label
                      className="form-check-label text-secondary ms-2 fs-5"
                      htmlFor="flexRadioDefault1"
                    >
                      baru
                    </label>
                    <input
                      className="form-check-input ms-4"
                      type="radio"
                      name="typestock"
                      value="bekas"
                      onClick={(e) =>
                        setForm({ ...form, condition: e.target.value })
                      }
                    />
                    <label
                      className="form-check-label text-secondary ms-2 fs-5"
                      htmlFor="flexRadioDefault1 "
                    >
                      Bekas
                    </label>
                  </div>
                </div>
                <div className="col-sm-8">
                  <label
                    htmlFor="Name"
                    className="col-sm-4 col-form-label text-secondary fs-5"
                  >
                    Category
                  </label>
                  <Select
                    placeholder="select Category"
                    // defaultValue={null}
                    options={categorys}
                    onChange={(e) => setForm({ ...form, category: e.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3 ms-lg-4">
            <div className="card-body">
              <h3 className="title-selling mt-2 fs-5">Photo Product</h3>
              <div className="line"></div>
              <div className="row mt-3 mx-2 photo-form">
                {Loading ? (
                  <>
                    <div className="col-sm-3 ms-3 mt-3">
                      <p className="text-start mt-2 text-secondary fs-5 text-sm">
                        Foto utama
                      </p>
                      <div className="card card-image">
                        <img
                          src={"https://fakeimg.pl/350x250/"}
                          alt="size-img"
                          className="img-fluid "
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 mt-5 upload">
                      <div className="card ">
                        <img
                          src={"https://fakeimg.pl/350x250/"}
                          alt="Bootstrap"
                          className="img-fluid"
                        />
                        <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                          <img src="../image/seling-product/box 5.png" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2 mt-5 upload">
                      <div className="card ">
                        <img
                          src={"https://fakeimg.pl/350x250/"}
                          alt="Bootstrap"
                          className="img-fluid"
                        />
                        <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                          <img src="../image/seling-product/box 5.png" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2 mt-5 upload">
                      <div className="card ">
                        <img
                          alt="Bootstrap"
                          src={"https://fakeimg.pl/350x250/"}
                          className="img-fluid"
                        />
                        <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                          <img src="../image/seling-product/box 5.png" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2 mt-5 upload">
                      <div className="card ">
                        <img
                          alt="Bootstrap"
                          src={"https://fakeimg.pl/350x250/"}
                          className="img-fluid"
                        />
                        <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                          <img src="../image/seling-product/box 5.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  imagePreview &&
                  imagePreview?.map((image, index) => {
                    console.log(index);
                    if (index === 0) {
                      return (
                        <div
                          className="col-lg-2 mt-5 me-lg-5 ms-lg-3 "
                          style={{ marginLeft: "130px" }}
                          key={index}
                        >
                          {/* <div className="card"> */}
                          <img
                            src={image}
                            width={120}
                            height={120}
                            alt="img"
                            className="imgs"
                          />
                          {/* </div> */}
                        </div>
                      );
                    } else if (index <= 4) {
                      return (
                        <div
                          className="col-lg-2 col-sm-1 mt-5 upload me-sm-1"
                          key={index}
                        >
                          {/* <div className="card ms-5  mt-2"> */}
                          <img
                            src={image}
                            width={80}
                            height={80}
                            alt="img"
                            className="imgs "
                          />
                          {/* </div> */}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="col-lg-2 mt-5 upload me-lg-3 d-none"
                          key={index}
                        >
                          {/* <div className="card ms-5  mt-2"> */}
                          <img
                            src={image}
                            width={100}
                            height={100}
                            alt="Bootstrap"
                            className="imgs"
                          />
                          {/* </div> */}
                        </div>
                      );
                    }
                  })
                )}
                <p className="text-start mt-2 text-secondary fs-6 ms-lg-5 text-lg">
                  Foto utama
                </p>
                <hr className="upload upload-line" />
                <div className="text-center mb-3">
                  <label for="fileProduct" className="btn btn-upload  w-25">
                    <span className="">Upload</span>
                  </label>
                  <input
                    id="fileProduct"
                    multiple
                    onChange={(e) => onImageUpload(e)}
                    className="form-control btn d-none"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3 ms-lg-4">
            <div className="card-body">
              <h3 className="title-selling mt-2 fs-5">Description</h3>
              <div className="line"></div>
              <div className="col-lg-12 mb-1 mt-4">
                <div className="">
                  {/* <div className="card-body description"> */}
                  {/* <img src={deskripsi} alt="" /> */}
                  {/* <div className="garis"></div> */}
                  <textarea
                    className="form-control card-desription"
                    id="floatingEmail"
                    name="description"
                    type="description"
                    defaultvalue={description}
                    onChange={handleChange}
                  ></textarea>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="col-sm-12 text-end">
              <button className="btn btn-jual" type="submit">
                {isLoading ? "Loading..." : "Jual"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
