import * as types from '../actions/action-types/actions';
import { categories } from '../../static/categories';

const initialState = {
  categories: categories,
  category: {}
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY_SUCCESS:
      return { ...state, category: action.payload }
    default:
      return state
  }
}

export { categoryReducer };
