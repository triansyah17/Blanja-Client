import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/module/profil/profil.css";
import axios from "axios";
import Profil from "../../components/module/profil/Profil";
import Footer from "../../components/module/home/footer/Footer";
import Navbar from "../../components/module/home/navbar/Navbar";
import Swal from "sweetalert2";
import ModalCreate from "../CreateProducts/CreateProducts";
import ModalEdit from "../EditProducts/EditProducts";
import "./style.css"


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  // console.log(products[0].photo);
  const [show, setShow] = useState(false);
  async function fetchData() {
    try {
     const token = localStorage.getItem("token");
     const createdAt = await axios.get(
       `${process.env.REACT_APP_API_BACKEND}products?search=${search}`,
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
      console.log(createdAt.data.data);
      setProducts(createdAt.data.data);
      console.log(products[0].photo[0])

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
    setShow(false)
    setShow(true)
  }, []);

  const deleteProducts = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleted Products??!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32C33B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Now loading",
          allowOutsideClick: false,
          showConfirmButton: false,
        })
        await axios
          .delete(`${process.env.REACT_APP_API_BACKEND}products/${id}`)
            .then(() => {
              Swal.fire({
                title : "Deleted!", 
                text : "Your products has been deleted.", 
                icon : "success",
                confirmButtonText: "Yes"
                }).then((res) =>{
                  if(res.isConfirmed){
                    window.location.reload()
                  }
                })
              setShow(false)
              })
            .catch(() => {
              Swal.fire("Deleted Failed!!", "failed deleted products", "error");
              setShow(false)
            });
      }
    });
  };
  return (
    <div className="body">
      <Navbar />
      <div className="row container-custom">
        <Profil>
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ">
            <li>
              <Link
                to="/productlist"
                className="link-dark d-inline-flex text-decoration-none rounded ms-5 mt-2"
              >
                myProduct
              </Link>
            </li>
            <li>
              <Link
                to="/selling"
                className="link-dark d-inline-flex text-decoration-none rounded ms-3 mt-3 text-secondary"
              >
                selling
              </Link>
            </li>
          </ul>
        </Profil>
        <div className="col-lg-7 col my-products">
          <div className="card mt-2 card-custom pb-5 pt-3 mb-5">
            <div className="card-body mb-5">
              <h4 className="mb-3">My Products</h4>
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight text-success">all Products</div>
                <hr/>
              </div>
              <div className="input-group rounded nav-search mt-3">
                <input
                  type="search"
                  className="border search-input ps-3 text-dark"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span
                  className="input-group-text search bg-light"
                  id="search-addon"
                >
                  <i className="bi bi-search" onClick={fetchData}></i>
                </span>
              </div>
              
              <div className="table-responsive mt-4 mb-5">
                <table className="table">
                  <thead className="table-light">
                    <tr className="text-center">
                      <th>No</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>stock</th>
                      <th>Deskripsion</th>
                      <th>Merk</th>
                      <th>Condition</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => (
                      <tr key={item.id} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.description}</td>
                        <td>{item.merk}</td>
                        <td>
                          {item.condition}
                        </td>
                        <td>
                          {item.photo.map((image, index) =>{
                            console.log(image)
                            return(
                            <div key={index}>
                              <img
                              // crossorigin="anonymous"
                              src={image}
                              alt=""
                              width={50}
                              height={55}
                              className="me-2"
                            />
                            </div>
                          )})
                            }  
                          
                        </td>
                        
                        <td>
                          <ModalEdit id={item.id} name={item.name} stock={item.stock} price={item.price} description={item.description}/>
                          <button
                            onClick={() => deleteProducts(item.id)}
                            className="btn btn-danger mt-1"
                            style={{padding: "2px", fontSize: "12px", width: "100%"}}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={products.length > 3 ? `` : "fixed-bottom"}>
      <Footer />

      </div>
    </div>
  );
};

export default ProductList;
