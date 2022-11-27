import React from 'react'
import './page.css'
import {  Link } from "react-router-dom";
function Page404() {
  return (
    <div>
       <h1>Not Found</h1>  
        {/* <p className="zoom-area"><b>Belanja</b> Hope you understand our pain as our developer 😇 thank you visit again</p>   */}
        <section className="error-container">  
          <span><span>4</span></span>  
          <span>0</span>  
          <span><span>4</span></span>  
        </section>  
        <div className="link-container">
          <Link to="/home" className="more-link">
            Back Home
            </Link>   
        </div>
    </div>
  )
}

export default Page404