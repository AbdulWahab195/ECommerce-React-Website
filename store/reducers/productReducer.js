import * as types from '../actions/action-types/actions';

const initialState = {
  products: [],
  featured: [],
  searched: [],
  productDetail: {},
  pagination: {}
};

const setPagination = (payload) => {
  return {
    size: payload.search_criteria.page_size,
    current: payload.search_criteria.current_page,
    total: payload.total_count
  }
}

const getActive = (items) => {
  return items.filter(e => e.status !== 2);
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return { ...state, products: getActive(action.payload.items), pagination: setPagination(action.payload) }
    case types.GET_SEARCHED_SUCCESS:
      return { ...state, searched: getActive(action.payload.items), pagination: setPagination(action.payload) }
    case types.GET_PRODUCT_SUCCESS:
      return { ...state, productDetail: action.payload }
    case types.GET_FEATURED_SUCCESS:
      return { ...state, featured: getActive(action.payload.items) }
    default:
      return state
  }
}

export { productReducer };
