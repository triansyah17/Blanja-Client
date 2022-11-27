/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import "../home/StyleHome.css";
import Footer from '../home/footer/Footer'
// import bag from '../../../assets/image/bag.png'
import Rectangle from "../../../assets/image/Rectangle 605.png";
import shape from "../../../assets/image/Shape.png";
import Total from "../Total/Total";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../configs/redux/actions/bagAction";
import { useNavigate } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../../base/Button/Button";

const Bag = () => {
  const { cart } = useSelector((state) => state.bag);
  console.log(cart);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);
  const [checked, setChecked] = useState(false);
  let [totalHarga, setTotalHarga] = useState(0)
  // let totalHarga = 0;
  console.log(totalHarga)

  const calculation = () => {
    // dispatch(getCart());
    for (let i = 0; i < cart.length; i++) {
      totalHarga += cart[i].price * cart[i].qty;
    }
  }
  for (let i = 0; i < cart.length; i++) {
    totalHarga += cart[i].price * cart[i].qty;
  }
  

  // calculation()
  const addQty = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BACKEND}cart/add/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        dispatch(getCart());

      setQty(1);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(qty);
  const deleteCart = async (ID) => {
    try {
      console.log(ID)
      const result = await axios.delete(`${process.env.REACT_APP_API_BACKEND}cart/${ID}`);
      console.log(result)
      dispatch(getCart())
      // setQty(1);

    } catch (error) {
      console.log(error);
    }
  };

  const MinQty = async(id) => {
    await axios
      .put(`${process.env.REACT_APP_API_BACKEND}cart/min/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        dispatch(getCart());
        setQty(1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    dispatch(getCart());
  }, []);
  
  return (
    <Fragment>
      <div className="container mt-5">
        <h3 className="title-bag">My Bag</h3>
        <div className="row ">
          <div className="col-lg-8 pl-lg-0">
            <div className="card mb-3 select-all">
              <div className="table-responsive-sm">
                <table className="table mt-3">
                  <tbody>
                    <td className="me-5">
                      <div className="check-select">
                        <label className="customcheck ms-2">
                          <p className="select-item ms-4">
                            Select all items{" "}
                            <span className="text-secondary">
                              {/* ({cart.length} items selected) */}
                            </span>{" "}
                          </p>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <span className="checkmak ms-2 mt-2"></span>
                        </label>
                      </div>
                    </td>
                    <td className="d-flex justify-content-end">
                      <button className="btn delete">Delete</button>
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
            {cart.length > 0 && (
              <ul>
                {cart.map((item, index) => (
                  <div className="card mb-3 card-bag" key={index}>
                    <div className="table-responsive-sm">
                      <table className="table">
                        <tbody >
                          <td className="align-middle ">
                            <div className="check ms-2 mt-2">
                              <label className="customcheck mt-2 input">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </td>
                          <td className="align-middle pt-3 float-start">
                            <img
                              className="img-products"
                              src={item.image}
                              alt="product"
                            />
                          </td>
                          <td className="align-middle float-start pt-4">
                            <p className="post mb-1 ms-0">{item.name}</p>
                            <span className="text-secondary sub-post ms-0">
                              {item.merk}
                            </span>
                          </td>
                          <td className="align-middle">
                            <tr>
                              <button
                                className="btn btn-secondary min"
                                onClick={() => {
                                  MinQty(item.id)
                                  // dispatch(getCart())

                                }}
                              >
                                <img
                                  src={Rectangle}
                                  alt=""
                                  className="icon-min"
                                />
                              </button>
                            </tr>
                          </td>
                          <td className="align-middle ps-2">{item.qty}</td>
                          <td className="align-middle">
                            <tr>
                              <button
                                className="btn btn-light max"
                                onClick={() => {
                                  addQty(item.id);
                                }}
                              >
                                <img src={shape} alt="" className="icon-max" />
                              </button>
                            </tr>
                          </td>
                          <td className="align-middle price">
                            <FormatRupiah value={item.price} />
                          </td>
                          <td className="align-middle ">
                          <button
                            onClick={() => {
                              deleteCart(item.id);
                              
                            }}
                            className="btn btn-light text-danger "
                          >
                            hapus
                          </button>
  
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </ul>
            )}
            {cart.length < 1 && <h1>Sorry Data Empty</h1>}
          </div>
          <Total
            onClick={() => {
              // navigate("/checkout");
            }}
            totalPrice="Total Price"
            priceBag={<FormatRupiah value={totalHarga} />}
          >
            {" "}
            <Link to="/Checkout">
              <Button
                className="mt-3 w-100 btn btn-checkout"
                title=" Checkout"
              ></Button>
            </Link>
          </Total>
        </div>
      </div>
      <div className={cart.length < 4 ? "fixed-bottom" : ""}>
        <Footer/>
      </div>
    </Fragment>
  );
};

export default Bag;
