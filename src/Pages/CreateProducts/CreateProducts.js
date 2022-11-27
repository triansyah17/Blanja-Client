// import React, {Fragment, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useDispatch } from "react-redux"
// import Swal from "sweetalert2";
// import createProducts from "../../configs/redux/actions/createProduct";

// const ModalCreate = () => {
//   const dispatch = useDispatch()
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [image, setImage] = useState([]);
//   console.log(image)
//   const handleUpload = (e) =>{
//     console.log(e.target.files[0])
//     const uploader = e.target.files
//     setImage(uploader)
//   }

//   const [data, setData] = useState({
//     name:"",
//     stock:"",
//     price:"",
//     description:"",
//     merk: ""
//   })

//   const handleChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//     console.log(data);
// };

//   const handleSubmit = (e) =>{
//     e.preventDefault()
//     // window.location.reload()
//     dispatch(createProducts(data, image, setShow))
//   }

//   return (
//     <Fragment>
//       <button className="btn btn-success mt-5" onClick={handleShow}>
//         Create
//       </button>
//       <Modal show={show} onHide={handleClose} >
//         <Modal.Header closeButton>
//           <Modal.Title>Create Product</Modal.Title>
//         </Modal.Header>
//         <form onSubmit={handleSubmit}>
//         <Modal.Body>
//         <input
//               className="form-control mt-3"
//               type="text"
//               placeholder="Name"
//               name="name"
//               value={data.name}
//               onChange={handleChange}
//             />
//             <input
//               className="form-control mt-3"
//               type="text"
//               placeholder="stock"
//               name="stock"
//               value={data.stock}
//               onChange={handleChange}
//             />
//             <input
//               className="form-control mt-3"
//               type="text"
//               placeholder="price"
//               name="price"
//               value={data.price}
//               onChange={handleChange}
//             />
//             {/* <input
//               className="form-control mt-3"
//               type="text"
//               placeholder="category_id"
//               name="category_id"
//               value={data.category_id}
//               onChange={handleChange}
//             />
//             <input
//               className="form-control mt-3"
//               type="text"
//               placeholder="transaksi_id"
//               name="transaksi_id"
//               value={data.transaksi_id}
//               onChange={handleChange}
//             /> */}
//             <input
//               className="form-control mt-3"
//               type="text"
//               placeholder="description"
//               name="description"
//               value={data.description}
//               autoComplete= "off"
//               onChange={handleChange}/>
//             <input
//               className="form-control mt-3"
//               type="file"
//               placeholder="photo"
//               name="photo"
//               onChange={handleUpload}
//               multiple
//             />
//             <input
//               className="form-control mt-3"
//               type="text"
//               placeholder="Merk"
//               name="merk"
//               value={data.merk}
//               onChange={handleChange}
//             />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <button type="submit" className="btn btn-primary" title="register" onClick={() => {
//             handleClose()
//             Swal.fire({
//               title: 'Now loading',
//               allowEscapeKey: false,
//               imageUrl: "images/ajaxloader.gif",
//               allowOutsideClick: false,
//               showConfirmButton: false,
//               onOpen: () => {
//                 Swal.showLoading();
//               }
//             })
//           }}>Create</button>
//         </Modal.Footer>
//         </form>
//       </Modal>
//     </Fragment>
//   );
// }

// export default ModalCreate;
