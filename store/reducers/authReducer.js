import * as types from "../actions/action-types/actions";

const initialState = {
  user: {},
  bearer: "",
  token: "",
  customerBearer: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return { ...state, user: action.payload };
    case types.GET_BEARER:
      return { ...state, bearer: action.payload };
    case types.LOGIN_SUCCESS:
      return { ...state, login: action.payload };
    case types.SIGNUP_SUCCESS:
      return { ...state, register: action.payload };
    case types.CUSTOMER_BEARER:
      return { ...state, customerBearer: action.payload };
    default:
      return state;
  }
};

export { authReducer };
