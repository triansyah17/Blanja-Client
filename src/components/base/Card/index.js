import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import "./style.css"
const Card = ({src, to, titleName, price, merk, onClick}) => {
  useEffect(() =>{
    return onClick
  }, [])
  return (
    <div className='card1'>
      <div className="card shadow-sm ">
        <img src={src} className="img-fluid img" alt="picture" />
        <div className="card-body">
          <h5 className="card-title" onClick={onClick}>
            <Link to={to}>{titleName}</Link>
          </h5>
          <p className="price">{price}</p>
          <p className="card-text merk">{merk}</p>
          <div className="d-flex justify-content-start text-warning start">
            <div className="bi-star-fill"></div>
            <div className="bi-star-fill"></div>
            <div className="bi-star-fill"></div>
            <div className="bi-star-fill"></div>
            <div className="bi-star-fill"></div>
            <p className="rating  mt-2 ms-1 text-dark">(10)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card