import React, { useEffect, useState } from "react";
import Total from "../Total/Total";
import "../home/StyleHome.css";
import { useDispatch, useSelector } from "react-redux";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { getCart } from "../../../configs/redux/actions/bagAction";
import axios from "axios";

const Checkout = () => {
  const [show, setShow] = useState(false);
  const { cart } = useSelector((state) => state.bag);
  const [payment, setPayment] = useState([])
  const dispatch = useDispatch()
  const [address, setAddress] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem('token')
  const [formAddress, setFormAddress] = useState({
    address: address === undefined ? "" : address.address
  })
  console.log(cart)

  const handleChange = (e) =>{
    e.preventDefault();
    setFormAddress({
      ...formAddress,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) =>{
    // e.preventDefault();
    if(address === undefined){
      axios
        .post(`${process.env.REACT_APP_API_BACKEND}address`, formAddress, {
          headers: {
            authorization: `Bearer ${token}`
          }
        }).then(() => fetchAddress())
    }else{
      axios
        .put(`${process.env.REACT_APP_API_BACKEND}address`, formAddress, {
          headers: {
            authorization: `Bearer ${token}`
          }
        }).then(() => fetchAddress())
    }
  }
  const fetchAddress = async() =>{
    console.log(token)
    const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}address`,{
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    console.log(result.data.data)
    setAddress(result.data.data[0])
  }
  const fetchPayment = async () => {
    const api = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}payment`
    );
    const payments = api.data;
    // console.log(categorys);
    setPayment(payments);
  };
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  let totalHarga = 0;
  for(let i = 0; i < cart.length; i++) {
    totalHarga += cart[i].price * cart[i].qty;
  }
  useEffect(() =>{
    dispatch(getCart())
    fetchPayment()
    fetchAddress()
  }, [])
  
  return (
    <div className="container mt-5">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} name='address' onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>{
            handleSubmit()
            fetchAddress()
            handleClose()
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <h3 className="title-bag">Checkout</h3>
      <p className="sub-chekout">Shipping Adress</p>
      <div className="row ">
        <div className="col-lg-8 pl-lg-0">
          <div className="card mb-3 ">
            <div className="card-body">
              <h4 className="fw-bold">{user.fullname}</h4>
              <p className="fs-5">
                {address === undefined ? "" : address.address}
              </p>
              <button
                className=" btn btn-address"
                variant="primary"
                onClick={handleShow}
              >
                Choose another address
              </button>
            </div>
          </div>
          {cart.map((item) => (
            <div className="card mb-3 ">
              <div className="table-responsive-sm">
                <table className="table">
                  <tbody>
                    <td className="align-middle text-center ">
                      <img
                        className="img-products"
                        src={item.image}
                        alt="checkout"
                      />
                    </td>
                    <td className="align-middle">
                      <p className="post mb-1">{item.name}</p>
                      <span className="text-secondary sub-post">
                        {item.merk}
                      </span>
                    </td>
                    <td className="align-middle text-start">
                      qty : {item.qty}
                    </td>
                    <td className="align-middle text-start text-white">
                      {/* { item.qty} */}
                      Lorem
                    </td>
                    <td className="align-middle price">
                      {" "}
                      <FormatRupiah value={item.price} />
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <Total
          totalPrice="Order"
          shopping="Shopping Payment"
          Sumprice={<FormatRupiah value={totalHarga} />}
          priceBag={<FormatRupiah value={totalHarga} />}
          deleveri="Deleveri"
          price="Free Ongkir"
        >
          <select
            className="form-select w-100 mt-1 mb-4 mt-5 fw-bold"
          >
            <option className="fw-semibold">Select Payment</option>
            {payment.map((res, index) =>{
              console.log(res.paying)
              return(
                <option 
                value={res.id} 
                key={index}
                className="fw-semibold"
                >{res.paying}</option>
              )
            })

            }
            
            {/* <option value="OVO">OVO</option>
            <option value="Mandiri">Akulaku</option>
            <option value="BCA">BCA</option> */}
          </select>
          <button
            backgroundColor="#DB3022"
            color="white"
            borderRadius="25px"
            className="mt-3 w-100 btn btn-checkout"
          >
            Buy
          </button>
        </Total>
      </div>
    </div>
  );
};

export default Checkout;
