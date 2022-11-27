import React from 'react'
import Footer from '../components/module/home/footer/Footer'
import Navbar from "../components/module/home/navbar/Navbar";
import EditProfil from '../components/module/profil/EditProfil'

const Profil = () => {
  return (
    <div>
      <Navbar />
      <EditProfil />
      <div className='fixed-bottom'>
        <Footer/>
      </div>
    </div>
  );
}

export default Profil