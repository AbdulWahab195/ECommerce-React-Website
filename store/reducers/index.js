import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { categoryReducer } from './categoryReducer';
import { productReducer } from './productReducer';
import { authReducer } from './authReducer';

export default combineReducers({
  cartReducer,
  categoryReducer,
  productReducer,
  authReducer
});
