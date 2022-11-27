import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import axio from "../../axios";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const getProduct =
  ({ page, limit, search, sort, sortby }) =>
  async (dispatch) => {
    try {
      const navigate = useNavigate();
      dispatch({ type: ActionTypes.GET_PRODUCT_PENDING });
      const { data } = await axio({
        url: `/products?page=${page}&limit=${limit}${
          search ? "&search=" + search : ""
        }${sort ? "&sort=" + sort: ""}`,
        method: "GET",
      });

      dispatch({
        type: ActionTypes.GET_PRODUCT_SUCCESS,
        payload: { data: data.data, pagination: data.pagination },
      });
      navigate("/productList");
    } catch (error) {
      dispatch({
        type: ActionTypes.GET_PRODUCT_ERROR,
        payload: error.response,
      });
    }
  };

// export const setDataProduct = (page, type) => (dispach) => {
//   axios
//     .get(
//       `${process.env.REACT_APP_API_BACKEND}products?page=${page}&type=${type}`
//     )
//     .then((result) => {
//       const response = result.data.data;
//       dispach({ type: ActionTypes.SET_PRODUCTS, payload: response });
//       const pagination = result.data.pagination;
//       // console.log(paginate);
//       dispach({ type: ActionTypes.UPDATE_PAGE, payload: pagination });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const selectedProduct = (product) => {
//   return {
//     type: ActionTypes.SELECTED_PRODUCT,
//     payload: product,
//   };
// };
// export const updateProduct = (product) => {
//   return {
//     type: ActionTypes.UPDATE_PRODUCTS,
//     payload: product,
//   };
// };

export const getDetail = (id) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_PENDING" });
  const data = await axios
    .get(`${process.env.REACT_APP_API_BACKEND}products/${id}`)
    .catch((err) => {
      console.log(err);
    });
  console.log(data);

  dispatch({ type: ActionTypes.SELECTED_PRODUCT, payload: data });
};

// export const deleteProduct = (product) => {
//   return {
//     type: ActionTypes.DELETE_PRODUCTS,
//     payload: product,
//   };
// };
// export const removeSelectedProduct = () => {
//   return {
//     type: ActionTypes.REMOVE_SELECTED_PRODUCT,
//   };
// };
