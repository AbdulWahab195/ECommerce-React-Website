import { api } from "../../services/api";
import * as types from "./action-types/actions";

export const getProduct = sku => {
  let options = { url: `products/${sku}` };
  options.types = [types.GET_PRODUCT_SUCCESS, types.GET_PRODUCT_FAILURE];

  return api.get(options);
};

export const currentProduct = product => dispatch => {
  dispatch({
    type: types.GET_PRODUCT_SUCCESS,
    payload: product
  });
};

export const featuredProducts = (id, page) => {
  let options = {
    url: `products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${id}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[pageSize]=12&searchCriteria[currentPage]=${page}`
  };
  options.types = [types.GET_FEATURED_SUCCESS, types.GET_FEATURED_FAILURE];

  return api.get(options);
};

export const searchProducts = (str, page) => {
  let options = {
    url: `products?searchCriteria[filterGroups][0][filters][0][field]=name&searchCriteria[filterGroups][0][filters][0][value]=%25${str}%25&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][1][field]=sku&searchCriteria[filterGroups][0][filters][1][value]=%25${str}%25&searchCriteria[filterGroups][0][filters][1][conditionType]=like&searchCriteria[pageSize]=12&searchCriteria[currentPage]=${page}`
  };
  options.types = [types.GET_SEARCHED_SUCCESS, types.GET_SEARCHED_FAILURE];

  return api.get(options);
};
