import React, { useEffect } from "react";
import Navbar from "../components/module/home/navbar/Navbar";
import Populer from "../components/module/home/popular/Populer";
import Footer from "../components/module/home/footer/Footer";
import axios from "axios";
import Card from "../components/base/Card";
import { FormatRupiah } from "@arismun/format-rupiah";
import { useState } from "react";
import "./style.css";
import Carausel from "../components/module/home/Caraousel/Carausel";
import NavbarAfterLogin from "../components/module/home/navbar/NavbarAfterLogin";
import { useSelector } from "react-redux";
import CategoryCarausel from "../components/module/home/Caraousel/CategoryCarausel";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}products`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {user ? <Navbar /> : <NavbarAfterLogin />}
      <Carausel />
      {/* <Category /> */}
      <CategoryCarausel />
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p>What are you currently looking for</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3 ">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <Card
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
      <Populer />
      <Footer />
    </div>
  );
};

export default Home;
