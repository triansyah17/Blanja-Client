import React, { useEffect, useState} from "react";
import "../StyleHome.css";
import axios from "axios";
import Card from "../../../base/Card";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useNavigate } from "react-router-dom";


const Product = ({ title, subtitle }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  
  const navigation = (id) =>{
    navigate(`/detail/${id}`)
    window.location.reload();
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}products`)
      .then( (response)=> {
        setProducts(response.data.data);
      })
      .catch( (error)=> {
        console.log(error);
      });
  }, []);
 

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">{title}</h3>
            <p>{subtitle}</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3 m-auto">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <Card
                  onClick={() => { return window.location.reload()}}
                  src={item.photo[0]}
                  to={`/detail/${item.id}`}
                  titleName={item.name}
                  price={<FormatRupiah value={item.price} />}
                  merk={item.merk}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product