import { api } from "../../services/api";
import * as types from "./action-types/actions";

export const shippingMethod = data => {
  const cartID = sessionStorage.getItem("cartID");
  let options = { url: `guest-carts/${cartID}/estimate-shipping-methods` };
  options.types = [
    types.SHIPPING_METHOD_SUCCESS,
    types.SHIPPING_METHOD_FAILURE
  ];

  return api.post(options, data);
};

export const shippingInfo = data => {
  const cartID = sessionStorage.getItem("cartID");
  let options = { url: `guest-carts/${cartID}/shipping-information` };
  options.types = [types.SHIPPING_INFO_SUCCESS, types.SHIPPING_INFO_FAILURE];

  return api.post(options, data);
};

export const processTransaction = data => {
  const cartID = sessionStorage.getItem("cartID");
  let options = { url: `guest-carts/${cartID}/payment-information` };
  options.types = [types.TRANSACTION_SUCCESS, types.TRANSACTION_FAILURE];

  return api.post(options, data);
};
