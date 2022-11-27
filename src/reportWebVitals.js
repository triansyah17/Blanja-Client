const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;



// import axios from "axios";
// import Card from "../components/base/Card";
// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import Footer from "../components/base/Footer/Footer";
// import Navbar from "../components/module/home/Navbar/Navbar";

// const MyProducts = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   const [products, setProducts] = useState([]);

//   const handleSort = (e) => {
//     setSort(e.currentTarget.value);
//   };
//   console.log(search);
//   const handleSearch = (e) => {
//     e.preventDefault();
//     getProducts();
//     setSearchParams({
//       search,
//       sort,
//     });
//   };

//   const getProducts = async () => {
//     const cari =
//       searchParams.get("search") === null ? "" : searchParams.get("search");
//     axios
//       .get(
//         `${process.env.REACT_APP_BACKEND}/product?search=${cari}&sort=${sort}`
//       )
//       .then((response) => {
//         console.log(response.data.data);
//         setProducts(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   useEffect(() => {
//     getProducts();
//     setSearch(searchParams.get("search"));
//     searchParams.get("search");
//     searchParams.get("sort");
//   }, [searchParams]);
//   // console.log(searchParams.get("sort"));

//   return (
//     <div className="h-100">
//       <Navbar />
//       <div className="container">
//         <div className="row">
//           <div className="products">
//             <h3 className="title">New</h3>
//             <p className="mt-5">My Products List</p>
//           </div>

//           {/* <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5">
//         </div> */}
//           <form onSubmit={handleSearch}>
//             <select onChange={handleSort}>
//               <option value="">Pilih Option</option>
//               <option value="ASC">A-Z</option>
//               <option value="DESC">Z-A</option>
//             </select>
//             <button type="submit">Sort</button>
//           </form>
//           <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
//             {products.length > 0 ? (
//               products.map((item) => (
//                 <div className="col" key={item.id}>
//                   <Card
//                     src={item.photo}
//                     to={`/detail/${item.id}`}
//                     titleName={item.productname}
//                     price={item.priceproduct}
//                   />
//                 </div>
//               ))
//             ) : (
//               <div className=" text-center m-auto mb-5">
//                 <h2>Product Not Found :(</h2>
//                 <Footer />
//               </div>
//             )}
//           </div>
//           {/* <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5 justify-content-evenly">
//         </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProducts;

// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// // import Buttons from "../Button/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { signOut } from "../../../configs/redux/actions/userAction";
// import cart from "../../../assets/image/search.svg";
// import Profil from "../../../assets/image/profil.png";
// import bell from "../../../assets/image/bell.png";
// import mail from "../../../assets/image/mail.png";
// import { Dropdown, Button, Modal, DropdownButton } from "react-bootstrap";
// import swal from "sweetalert2";
// import axios from "axios";

// const NavbarBase = ({ onChange, onClick, src, srcCart }) => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const navigate = useNavigate();
//   const data = useSelector((state) => state.bag);
//   console.log(user);
//   const handleSignOut = () => {
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("id");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     dispatch(signOut());
//     swal.fire({
//       icon: "success",
//       title: `Selamat Tinggal!!`,
//     });
//   };

//   const [search, setSearch] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [sort, setSort] = useState("");

//   const handleSearch = () => {
//     // e.preventDefault();
//     // getData();
//     // if (search !== "" && sort !== "") {
//     //   setSearch({
//     //     keyword: search,
//     //     sort: sort,
//     //   });
//     // } else if (search !== "") {
//     //   setSearchParams({
//     //     keyword: search,
//     //   });
//     // } else if (sort !== "") {
//     //   setSearchParams({
//     //     sort: sort,
//     //   });
//     // } else {
//     //   setSearchParams({});
//     // }
//     navigate({
//       pathname: "/myProducts",
//       search: "?search=" + search + "&sort=" + searchParams.get("sort"),
//     });
//   };

//   useEffect(() => {
//     datas();
//   }, []);

//   const [setDate_of_birth, setDate_of_birthsetDate_of_birth] = useState("");
//   useEffect(() => {
//     datas();
//   }, []);

//   const datas = async () => {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(
//       `${process.env.REACT_APP_BACKEND}/user/profile`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     setDate_of_birthsetDate_of_birth(response.data.data[0].setDate_of_birth);
//   };
//   return (
//     <nav className="navbar navbar-expand-md navbar-light fixed-top mb-4">
//       <div className="container">
//         <Link to="/home">
//           <img src={src} alt="" className="" />
//         </Link>
//         <div className="collapse navbar-collapse ms-auto " id="navbarCollapse">
//           <ul className="navbar-nav mb-2 mb-md-0 w-50 me-auto">
//             <div className="input-group rounded nav-search">
//               <input
//                 type="search"
//                 className="form-control search-input"
//                 placeholder="Search"
//                 aria-label="Search"
//                 aria-describedby="search-addon"
//                 name="search"
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <span
//                 className="input-group-text search bg-light"
//                 id="search-addon"
//               >
//                 <i className="bi bi-search" onClick={handleSearch}></i>
//               </span>
//             </div>
//           </ul>
//           {user?.id ? (
//             <>
//               <form className="ms-4">
//                 <Link to="/Checkout">
//                   <button
//                     className="btn btn-link position-relative"
//                     style={{
//                       width: 40,
//                       height: 40,
//                     }}
//                   >
//                     <img src={cart} alt="" className="icon-cart mb-2" />
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                       {data.cart.length}
//                     </span>
//                   </button>
//                 </Link>
//                 <img src={bell} alt="" className="icon-cart ms-3 mb-2" />
//                 <img src={mail} alt="" className="icon-cart ms-3 mb-2" />
//               </form>
//               <DropdownButton
//                 align="end"
//                 title={
//                   <img
//                     src={setDate_of_birth ? setDate_of_birth : Profil}
//                     alt=""
//                     width={35}
//                     height={35}
//                     className="rounded-circle"
//                   />
//                 }
//                 variant="link"
//                 id="dropdown-menu-align-end"
//               >
//                 <Dropdown.Item variant="link">
//                   {" "}
//                   <p>{user.fullname}</p>
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item variant="secondary" eventKey="4">
//                   {" "}
//                   <Link to="/profil"> Profil</Link>
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item eventKey="4" variant="danger">
//                   <Link to="/login" onClick={() => handleSignOut()}>
//                     Logout
//                   </Link>
//                 </Dropdown.Item>
//               </DropdownButton>
//             </>
//           ) : (
//             <>
//               <Link to="/login">
//                 <button className="btn button-login " type="button">
//                   {" "}
//                   login
//                 </button>
//               </Link>
//               <Link to="/register">
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary button-signup 3 mb-2"
//                 >
//                   {" "}
//                   sign up
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavbarBase;