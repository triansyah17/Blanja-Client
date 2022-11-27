import axios, { Axios } from "axios";
import swal from "sweetalert2";
import { ActionTypes } from "../constants/action-types";

export const loginUser = (dataForm, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}auth/login`,
      dataForm
    );
    const user = result.data.data;
    // const role = result.data.data
    const users = {
      role: result.data.data.role,
      email: result.data.data.email,
    };
    console.log(users);
    const token = result.data.data.token;
    const id = result.data.data.id;
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("refreshToken", user.refreshToken);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      token: token.data,
      payload: user,
    });
    swal.fire({
      icon: "success",
      title: "Success",
      text: `Welcome to Blanja :)`,
    });
    navigate("/home");
  } catch (error) {
    swal.fire({
      icon: "error",
      title: "Sorry...",
      text: error.response.data.message,
    });
    console.log(error.message);
  }
};

export const signUp = (dataForm, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}auth/register`,
      dataForm
    );
    const user = result.data;
    console.log(user);
    localStorage.setItem("token", user.token);
    localStorage.setItem("refreshToken", user.refreshToken);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
    swal.fire({
      icon: "success",
      title: "Success Register",
      text: "please login",
    });
    navigate("/login");
  } catch (error) {
    swal.fire({
      icon: "error",
      title: "Sorry...",
      text: error.response.data.message,
    });
    console.log(error.response);
  }
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_PRODUCT",
    });

    dispatch({
      type: "SIGN_OUT",
    });
  };
};
// export const getProfile = () => async(dispatch) => {
//  try {
//     const token = localStorage.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhbWlzdWtlaGlybzI1MTBAZ21haWwuY29tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsInJvbGUiOiJzZWxsZXIiLCJpZCI6ImU4MTg4ODQyLTQyMWUtNDY4MC04YWM3LTVkMTg1MDIxZjNhOSIsImlhdCI6MTY2ODUxOTkzNCwiZXhwIjoxNjY4NTIzNTM0LCJpc3MiOiJ0b2tva3UifQ.pLtxGfMxuJqGA0D9a13AawHPyme__-rdSCR6ZIJDlsE')
//     const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/auth/profile`,
//     {
//       headers:{
//         Authorization: `Bearer ${token}`,
//       }
//     }
//     )
//     console.log(result.data)
//     const data = result.data
//     dispatch({ type: "GET_USER_SUCCESS", payload: data})
//  } catch (error) {
//     console.log(error)
//  }
// }
export const updateUser = (users) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: users,
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else return null;
  };
};
