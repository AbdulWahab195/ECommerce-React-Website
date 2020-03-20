import { api } from "../../services/api";
import * as types from "./action-types/actions";
import { CUSTOMER_BEARER } from "./action-types/actions";

export const login = params => {
  let options = { url: "integration/customer/token" };
  options.types = [types.LOGIN_SUCCESS, types.LOGIN_FAILURE];

  return api.post(options, params);
};

export const getCustomerBearer = payload => {
  return {
    type: CUSTOMER_BEARER,
    payload
  };
};

export const register = params => {
  let options = { url: "customers" };
  options.types = [types.SIGNUP_SUCCESS, types.SIGNUP_FAILURE];

  return api.post(options, params);
};

export const getUser = params => {
  let options = { url: "user" };
  options.types = [types.GET_USER_SUCCESS, types.GET_USER_FAILURE];

  return api.post(options, params);
};
