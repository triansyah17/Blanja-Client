import axios from "axios";
import Swal from "sweetalert2";

 const updateProducts = (data, id, Image, setShow) => async (dispacth) =>{
    try{
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("stock", data.stock)
        formData.append("price", data.price)
        formData.append("description", data.description)
        // formData.append("category_id", data.category_id)
        // formData.append("transaksi_id", data.transaksi_id)
        formData.append("image", Image)
        formData.append('merk', data.merk)
        const products = await axios.put(`${process.env.REACT_APP_API_BACKEND}products/${id}`, formData, {
            header:{
                "Content-Type": "multipart/form-data",
            }
        })
        console.log(products)
        Swal.fire({
            title:"Success",
            text: "Your Products Updated",
            icon: "success",
            isConfirmed: (window.location.reload()),
        })
        // window.location.reload()
        setShow(false)
        const result = products.data.data
        console.log(result)
        dispacth({ type: "UPDATE_PRODUCT", payload: result })

    }catch(err){
        console.log(err.message)
        alert("Update Failed")
        setShow(false)
    }
}
export default updateProducts