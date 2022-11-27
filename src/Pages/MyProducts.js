import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/module/home/navbar/Navbar";
import Card from "../components/base/Card";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import "../Pages/Page404/page.css";
import { Dropdown } from "react-bootstrap";

const MyProducts = () => {
  // const [searchParams, setSearchParams] = useSearchParams([]);
  // const [products, setProduct] = useState([])
  // const getProducts = async () => {
  //   axios
  //     .get(
  //       `http://localhost:5000/products?${searchParams}`
  //     )
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setProduct(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  //   useEffect(() => {

  //     getProducts();
  //     searchParams.get("search");
  //   }, [ searchParams ]);
  //   console.log(getProducts)
  const [show, setShow] = useState(false);
  // const handleHide = () => setShow(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const handleSort = (e) => {
    setSort(e.currentTarget.value);
  };

  function getData() {
    const searching =
      searchParams.get("search") === null ? "" : searchParams.get("search");
    axios
      .get(
        `${process.env.REACT_APP_API_BACKEND}products?search=${searching}&sort=${sort}`
      )
      .then((response) => {
        setProducts(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   getData();
  //   setSearchParams({
  //     search,
  //     sort
  //   })
  // };

  //   console.log(search)
  //   console.log(sort)

  useEffect(() => {
    getData();
    setSearch(searchParams.get("search"));
    searchParams.get("search");
    searchParams.get("sort");
  }, [searchParams, sort]);

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p className="mt-5">My Products</p>
          </div>

          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 ">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Sorting Name
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <button
                    className="btn btn-info me-3"
                    value="ASC"
                    onClick={handleSort}
                  >
                    Name A-Z
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    className="btn btn-success"
                    value="DESC"
                    onClick={handleSort}
                  >
                    Name Z-A
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
            {products.length > 0 ? (
              products.map((item) => (
                <div className="col" key={item.id}>
                  <Card
                    src={item.photo[0]}
                    to={`/detail/${item.id}`}
                    titleName={item.name}
                    price={item.price}
                    merk={item.merk}
                  />
                </div>
              ))
            ) : (
              <div className="text-center m-auto  beban ">
                <h2>Sorry... Data yang anda cari tidak ada</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="container-custom"></div>
        <footer className="py-3 bg-dark mt-5 footer-dekstop footer">
          <div className="container">
            <p className="m-0 text-center text-white">
              Copyright &copy; Aditya Triansyah
            </p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default MyProducts;
