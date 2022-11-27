import axios from "axios"
export const getCart =  () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    dispatch({type: "GET_MYCART_PENDING"})
    const myCart = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/cart`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    );
    const cart = myCart.data
    console.log(cart)
    console.log(myCart)
    dispatch({type: "GET_MYCART_SUCCESS", payload: {cart}})
  } catch (error) {
    console.log(error);
  }
}

export const addMycart = (data, navigate, buy) => async(dispatch) =>{
  try {
    // const token = localStorage.getItem('token')
    dispatch({type: "GET_MYCART_PENDING"})
    console.log('halloo', data)
    const cart =  await axios.post(`${process.env.REACT_APP_API_BACKEND}/cart`, data, {
        headers: {
            "Content-Type": "application/json",
            },
    });
    console.log(cart)
    if(buy === true){
      navigate("/checkout")
    }else{
      navigate("/Bag");
    }
    dispatch({type: "GET_MYCART", payload: {cart}})
  } catch (error) {
    console.log(error);
  }
}