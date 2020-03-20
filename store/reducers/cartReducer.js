import {
  RESET_CART,
  ADD_TO_CART_PRODUCT,
  REMOVE_CART_PRODUCT,
  UPDATE_CART_PRODUCT,
  GET_CART_PRODUCT,
  CREATE_CART_SUCCESS
} from "../actions/action-types/actions";

const initState = {
  cartItems: [],
  cartID: "",
  selectedUnit: "LB"
};

const cartReducer = (state = initState, action) => {

  if (action.type === "SET_UNIT") {
    return {
      ...state,
      selectedUnit: action.payload
    }
  }

  if (action.type === ADD_TO_CART_PRODUCT) {
    const data = action.payload;
    const getSession = sessionStorage.getItem("cart-items");

    let prevCarts = getSession ? JSON.parse(getSession) : [];

    if (prevCarts && Array.isArray(prevCarts) && prevCarts.length > 0) {
      let filterCart = prevCarts.find(item => item.id === data.id);
      if (filterCart) {
        const index = prevCarts.findIndex(x => x.id === data.id);
        prevCarts[index].quantity = action.qty;
      } else {
        prevCarts.push(data);
      }
      sessionStorage.setItem("cart-items", JSON.stringify(prevCarts));
    } else {
      sessionStorage.setItem("cart-items", JSON.stringify([data]));
    }
  }

  if (action.type === REMOVE_CART_PRODUCT) {
    const id = action.id;
    const getSession = sessionStorage.getItem("cart-items");
    let cartItems = getSession ? JSON.parse(getSession) : [];

    const index = cartItems.findIndex(x => x.id === id);

    cartItems.splice(index, 1);

    sessionStorage.setItem("cart-items", JSON.stringify(cartItems));
  }

  if (action.type === UPDATE_CART_PRODUCT) {
    return {
      ...state
    };
  }

  if (action.type === GET_CART_PRODUCT) {
    return {
      ...state,
      cartItems: action.payload.items || []
    };
  }

  if(action.type === CREATE_CART_SUCCESS) {
    sessionStorage.setItem("cartID", action.payload);
    return { ...state, cartID: action.payload }
  }

  if (action.type === RESET_CART) {
    return {
      ...state,
      cartItems: [],
    };
  } else {
    return state;
  }
};

export { cartReducer };
