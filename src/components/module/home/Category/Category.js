import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import './style.css'
import { useParams } from "react-router-dom";
import Card from "../../../base/Card";
import { FormatRupiah } from "@arismun/format-rupiah";


const Category = () => {
  const { id } = useParams()
  // const {category}  = useSelector((state) => state.getCategory);
  // console.log(category);
  //  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const fetch = async() =>{
    const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/category?search=${id}`)

    setData(result.data.data)
  }
  console.log(data)
   useEffect(() => {
    fetch()
      // dispatch(getCategory());
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
  return (
    // <div>
    //   <div className="container">
    //     <div className="mt-5" id="custom-cards">
    //       <h2 className="title ">Category</h2>
    //       <p className="sub-category">What are you currently looking for</p>
    //       <div className="row row-cols-2 row-cols-lg-5 align-items-center g-5 ">
    //         <div className="col categories categories1">
    //           <div className="card card-1 text-center d-flex flex-colum ">
    //             <div className="card-body m-2">
    //               <img src={Tshirt} alt="picture" className="img-fluid" />
    //               <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
    //                 <a href="/category/{category[0].id}" >
    //                 <p className="font-category"></p>
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col categories">
    //           <div className="card card-2 text-center d-flex flex-colum">
    //             <div className="card-body m-2">
    //               <img src={komputer} alt="picture" className="img-fluid" />
    //               <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
    //                 <p className="font-category"></p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col categories">
    //           <div className="card card-3 text-center d-flex flex-colum">
    //             <div className="card-body m-2">
    //               <img src={jacket} alt="picture" className="img-fluid" />
    //               <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
    //                 <p className="font-category"></p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col categories">
    //           <div className="card card-4 text-center d-flex flex-colum">
    //             <div className="card-body m-2">
    //               <img src={jeans} alt="picture" className="img-fluid" />
    //               <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
    //                 <p className="font-category"></p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col categories">
    //           <div className="card card-5 text-center d-flex flex-colum">
    //             <div className="card-body m-2">
    //               <img src={sepatu} alt="picture" className="img-fluid" />
    //               <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
    //                 <p className="font-category"></p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div>
      <div className="container mt-4">
        <div className="row">
          <div className="pt-4 fs-5">
            <p className="mt-5 mb-2 title"><a href="/home" className="fs-5 title">product</a> {"> Category > "} {id}</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
            {data.map((item) => (
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
    // </div>
  );
}

export default Category