import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Get All Products
export const getProduct = (
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings = 0
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    let link = `https://grocery-store-backend-three.vercel.app/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `https://grocery-store-backend-three.vercel.app/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const response = await fetch(link, {
      withCredentials: true,
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });   

    const data = await response.json();

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

// Get all products for admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    // const { data } = await axios.get("/api/v1/admin/products");
    let link = `https://grocery-store-backend-three.vercel.app/api/v1/admin/products`;
    const response = await fetch(link, {
      withCredentials: true,
      credentials: "include", 
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    let link = "https://grocery-store-backend-three.vercel.app/api/v1/admin/product/new";
    let response = await fetch(link, {
      withCredentials: true,
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: productData,
    });

    const data = await response.json();

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};  

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let link = `https://grocery-store-backend-three.vercel.app/api/v1/admin/product/${id}`;
    let response = await fetch(link, {
      withCredentials: true,
      credentials: "include",
      method: "DELETE",
      headers: {  
        Accept: "*/*",
      },
    });

    const data = await response.json();

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    let link = `https://grocery-store-backend-three.vercel.app/api/v1/admin/product/${id}`;
    let response = await fetch(link, {
      withCredentials: true,
      credentials: "include",
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: productData,
    });

    const data = await response.json();

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response,
    });
  }
};
// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    let link = "https://grocery-store-backend-three.vercel.app/api/v1/review";
    let response = await fetch(link, {
      withCredentials: true,
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: reviewData,
    });

    const data = await response.json();

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    // const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    let link = `https://grocery-store-backend-three.vercel.app/api/v1/reviews?id=${id}`;
    let response = await fetch(link, {
      withCredentials: true,
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });

    const data = await response.json();

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    let link = `https://grocery-store-backend-three.vercel.app/api/v1/reviews?id=${reviewId}&productId=${productId}`;
    let response = await fetch(link, {
      withCredentials: true,
      credentials: "include",
      method: "DELETE",
      headers: {
        Accept: "*/*",
      },
    });

    const data = await response.json();
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
