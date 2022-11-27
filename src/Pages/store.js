import React from 'react'
import Footer from '../components/module/home/footer/Footer'
import Navbar from "../components/module/home/navbar/Navbar";
import Store from '../components/module/profil/store';

const StoreProfile = () => {
  return (
    <div>
      <Navbar />
      <Store />
      {/* <div className='fixed-bottom mt-5'> */}
        <Footer/>
      {/* </div> */}
    </div>
  );
}

export default StoreProfile