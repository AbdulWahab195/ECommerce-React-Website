import {
  RESET_CART,
  ADD_TO_CART_PRODUCT,
  ADD_TO_CART_FAILURE,
  REMOVE_CART_PRODUCT,
  UPDATE_CART_PRODUCT,
  GET_CART_PRODUCT,
  GET_CART_FAILURE,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAILURE
} from "./action-types/actions";
import { api } from "../../services/api";

export const setUnit = e => dispatch => {
  dispatch({
    type: "SET_UNIT",
    payload: e.target.value
  });
};

// Reset cart after form submit
export const resetCart = () => {
  return {
    type: RESET_CART
  };
};

export const createCart = () => {
  let options = { url: `guest-carts` };
  options.types = [CREATE_CART_SUCCESS, CREATE_CART_FAILURE];

  return api.post(options, {});
};

// ADD TO CART
export const addToCartProduct = (payload, qty) => {
  const cartID = sessionStorage.getItem("cartID");
  const data = {
    cartItem: {
      sku: payload.sku,
      qty: qty,
      quote_id: cartID
    }
  };

  let options = { url: `guest-carts/${cartID}/items` };
  options.types = [ADD_TO_CART_PRODUCT, ADD_TO_CART_FAILURE];

  // if (document.cookie) {
  //   let customerBearer = document.cookie.split("customerBearer");
  //   var bearerArray = customerBearer["1"];
  //   var bearerSpace = bearerArray.replace(/\s/g, "");
  //   var customerToken = bearerSpace.substring(bearerSpace.indexOf(";") + 1);
  //   options.customerBearer = customerToken;
  // }

  return api.post(options, data);
};

// REMOVE TO CART
export const removeCartProduct = id => {
  const cartID = sessionStorage.getItem("cartID");
  if (cartID) {
    let options = { url: `guest-carts/${cartID}/items/${id}` };
    options.types = [REMOVE_CART_PRODUCT];

    return api.delete(options);
  }
};

// UPDATE TO CART
export const updateCartProduct = (itemID, qty) => {
  const cartID = sessionStorage.getItem("cartID");
  if (cartID) {
    const data = {
      cartItem: {
        item_id: itemID,
        qty: qty,
        quote_id: cartID
      }
    };
    let options = { url: `guest-carts/${cartID}/items/${itemID}` };
    options.types = [UPDATE_CART_PRODUCT];

    return api.put(options, data);
  }
  return {
    type: UPDATE_CART_PRODUCT,
    payload,
    qty
  };
};

// GET PRODUCT TO CART
export const getCartProduct = () => {
  const cartID = sessionStorage.getItem("cartID");
  if (cartID) {
    let options = { url: `guest-carts/${cartID}` };
    options.types = [GET_CART_PRODUCT, ADD_TO_CART_FAILURE];

    return api.get(options);
  }

  return {
    type: GET_CART_PRODUCT,
    payload: []
  };
};
