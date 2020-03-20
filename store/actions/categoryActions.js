import { api } from "../../services/api";
import * as types from "./action-types/actions";

export const getCategories = () => {
  let options = { url: "categories" };
  options.types = [types.GET_CATEGORIES_SUCCESS, types.GET_CATEGORIES_FAILURE];

  return api.get(options);
};

export const getCategory = id => {
  let options = { url: `categories/${id}` };
  options.types = [types.GET_CATEGORY_SUCCESS, types.GET_CATEGORY_FAILURE];

  return api.get(options);
};

export const getProductsByCategory = (id, page) => {
  let options = {
    url: `products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${id}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[pageSize]=12&searchCriteria[currentPage]=${page}`
  };

  options.types = [types.GET_PRODUCTS_SUCCESS, types.GET_PRODUCTS_FAILURE];

  return api.get(options);
};
