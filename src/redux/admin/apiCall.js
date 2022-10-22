import {
  loginFailure,
  loginStart,
  loginSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../slice/requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductSuccess8,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  updateProductSuccessDone,
} from "./productRedux";
import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} from "./orderRedux";
import {
  getMailStart,
  getMailSuccess,
  getMailFailure,
} from "./newsletterRedux.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/api/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/api/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const getMails = async (dispatch) => {
  dispatch(getMailStart());
  try {
    const res = await publicRequest.get("/mails");
    dispatch(getMailSuccess(res.data));
  } catch (err) {
    dispatch(getMailFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/api/user");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
export const addUsers = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/api/register`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/api/user/${id}`);
    dispatch(deleteUserSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, ad, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/api/user/${id}`, ad);
    dispatch(updateUserSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const updateOrder = async (id, stt, dispatch) => {
  dispatch(updateOrderStart());
  try {
    let sttx = "Pending";
    if (stt === "Pending") {
      sttx = "Delivered";
    } else {
      sttx = "Pending";
    }
    const res = await userRequest.put(`/orders/${id}`, {
      _id: id,
      status: sttx,
    });
    dispatch(updateOrderSuccess(id, sttx));
    window.location.reload(false);
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};

export const getUser = async (id, dispatch) => {
  let usern;
  try {
    const res = await userRequest.get(`/users/find/${id}`);
    usern = await res.data.username;
  } catch (err) {}
  return usern;
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/api/product/${id}`);
    dispatch(deleteProductSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, data, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/api/product/${id}`, data);
    dispatch(updateProductSuccessDone(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const updatePrd = async (
  dispatch,
  id,
  name,
  desc,
  price,
  category,
  color,
  size,
  status
) => {
  dispatch(updateProductStart());
  try {
    let stt = false;
    if (status.inStock === "true") {
      stt = true;
    } else {
      stt = false;
    }
    const res = await publicRequest.put("/api/product", {
      id: id,
      name: name,
      desc: desc,
      price: price,
      category: category,
      color: color,
      size: size,
      status: stt,
    });
    dispatch(
      updateProductSuccess({
        id,
        name,
        desc,
        price,
        category,
        color,
        size,
        stt,
      })
    );
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/api/product`, product);
    dispatch(addProductSuccess(res.data));
    window.location.reload(false);
  } catch (err) {
    dispatch(addProductFailure());
  }
};
