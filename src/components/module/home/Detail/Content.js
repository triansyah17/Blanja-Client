/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./StyleDetail.css";
// import axios from "axios";
import { useParams, Link,useNavigate } from "react-router-dom";
import retanggle from "../../../../assets/image/detail products/Rectangle 21.png";
import shape from "../../../../assets/image/detail products/Shape (1).png";
import './StyleDetail.css'
import { addMycart } from "../../../../configs/redux/actions/bagAction";
import {FormatRupiah} from "@arismun/format-rupiah"
import axios from "axios"
import { useDispatch } from "react-redux";

const Content = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [products, setProducts] = useState([]);
  
  console.log(products)
  const fetch = () =>{
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}products/${id}`)
      .then( (response)=> {
        setProducts(response.data.data[0]);
      })
      .catch( (error)=> {
        console.log(error);
      });
  }
  // fetch()
  useEffect(() => {
    fetch()
  }, []);
  const handleAddBag = async (detailProductId, navigate, buy = false) => {
    const id = localStorage.getItem('id')
    const data = {
      product_id: detailProductId,
      user_id: id,
    };

    dispatch(addMycart(data, navigate, buy))
    // ;
  };
   const [count, setCount] = useState(1);
   const handleSum = () => {
     setCount(count + 1);
   };
   const handleMin = () => {
     setCount(count - 1);
   };
   const [countSize, setCounts] = useState(1);
   const handleSums = () => {
     setCounts(countSize + 1);
   };
   const handleMins = () => {
     setCounts(countSize - 1);
   };
  return (
    <div>
      {/* {(products.data).length === 0 ? (
        <div class="text-center">
          <FontAwesomeIcon icon={faSpinner} spin />
          &nbsp;Loading
        </div>
      ) : ( */}
        <div className="container child-page">
          <div className="row mt-3">
            <div className="col-lg-5">
              <div className="galleries">
                <div className="galleries-container">
                    <img src={products?.photo ? products.photo[0] : products.photo} 
                      className="w-100 " alt="" id="jumbo"/>
                </div>
                <div className="thumb mt-3 text-center">
                  {products?.photo?.map((image, index) =>{
                    return(
                      <span
                      key={index}
                      href="#"
                      className="me-4 "
                  >
                    <img src={image} alt="" className="img"
                    onClick={(e) =>{
                      document.querySelector("#jumbo").src = e.target.src
                    }}
                    />
                  </span>
                    )
                  })
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-6  ms-2">
              <div className="title-product">
                <h3 className="product-title mt-3">{products.name}</h3>
                <p className="text-secondary sub-title mt-3">{products.merk}</p>
                <div className="d-flex justify-content-start text-warning start mt-5">
                  <div className="bi-star-fill"></div>
                  <div className="bi-star-fill"></div>
                  <div className="bi-star-fill"></div>
                  <div className="bi-star-fill"></div>
                  <div className="bi-star-fill"></div>
                  <p className="rating  mt-2 ms-1 text-dark">(10)</p>
                </div>
              </div>
              <div className="price-products mt-2">
                <p className="mb-3 title-price">Price</p>
                <h3 className="price-detail mt-2">
                  <FormatRupiah value={products.price} />
                </h3>
              </div>
              <div className="color-products mt-4 ">
                <p className="title-color">Color</p>
                <div className="d-flex justify-content-start start ">
                  <div className="d-flex  align-items-center btn-border">
                    <button className="btn btn-black"></button>
                  </div>
                  <button className="btn btn-red"></button>
                  <button className="btn btn-blue"></button>
                  <button className="btn btn-green"></button>
                </div>
              </div>
              <div className="size mt-3">
                <div className="d-flex justify-content-start ms-1 text-black">
                  <p className="title-size">Size</p>
                  <p className="title-jumlah ms-5 text-black">Jumlah</p>
                </div>
                <div className="d-flex justify-content-start mt-1 ms-2">
                  <div className="d-flex btn-min btn" onClick={handleMins}>
                    <img src={retanggle} className="m-auto icon" alt="" />
                  </div>
                    <p className="ms-2 me-2 mt-1 size size1">{ countSize}</p>
                  <div className="d-flex btn-max btn" onClick={handleSums}>
                    <img src={shape} className="m-auto icon" alt="" />
                  </div>
                  <div className="d-flex btn-min btn ms-5" onClick={handleMin}>
                    <img src={retanggle} className="m-auto icon" alt="" />
                  </div>
                  <p className="ms-2 me-2 mt-1 size size1">{count}</p>
                  <div className="d-flex btn-max btn" onClick={handleSum}>
                    <img src={shape} className="m-auto icon" alt="" />
                  </div>
                </div>
              </div>
              <div className="submit mt-5 mb-5">
                <div className="d-flex justify-content-start  ms-1">
                  <div className="col-lg-3 ">
                    <button className="btn btn-chat btn-event">Chat</button>
                  </div>
                  <div className="col-lg-4 ms-1">
                    {/* <Link to="/Bag"> */}
                      <button
                        className="btn btn-bag btn-event"
                        onClick={() => {
                          console.log(products.id);
                          handleAddBag(products.id, navigate);
                        }}
                      >
                        Add bag
                      </button>
                    {/* </Link> */}
                  </div>
                  <div className="col-lg-5 ms-1">
                    {/* <Link to="/Checkout"> */}
                      <button className="btn btn-buy btn-event"
                      onClick={() =>{
                        handleAddBag(products.id, navigate, true)
                      }}
                      >Buy Now</button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-12">
              <h3 className="title-info">Informasi Produk</h3>
              <h4 className="mt-4 text-sub">Condition</h4>
              <p className="text-danger new">{products.condition}</p>
              <p className="text-sub text-sub">Description</p>
              <div className="text ms-1 text-secondary">
                <p>{products.description}</p>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default Content;
