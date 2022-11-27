import React from 'react'
import Content from '../components/module/home/Detail/Content';
import InformasionProduct from '../components/module/home/Detail/InformasionProduct';
import Navbar from "../components/module/home/navbar/Navbar";
import Footer from "../components/module/home/footer/Footer";
import Product from '../components/module/home/newProduct/Product';
import NavbarAfterLogin from '../components/module/home/navbar/NavbarAfterLogin';
import { useSelector } from "react-redux";
import Category from '../components/module/home/Category/Category';



const DetailProduct = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user === undefined ? (
        <Navbar /> 
        ): (
        <NavbarAfterLogin />
      )}
      <Category />
      <div className='fixed-bottom'>
        <Footer/>
      </div>
    </div>
  );
}

export default DetailProduct