import axios from "axios";
import { GET_BEARER } from "../store/actions/action-types/actions";

const instance = axios.create({
  baseURL: process.env.baseURL,
  headers: { "content-type": "application/json; charset=utf-8" }
});

const getToken = () => async dispatch => {
  const params = {
    username: process.env.user,
    password: process.env.password
  };
  const response = await instance.post(process.env.tokenPath, params);
  dispatch({
    type: GET_BEARER,
    payload: `Bearer ${response.data}`
  });
};

// let c = document.cookie
//   .split("customerBearer")
//   .reduce(
//     (ac, cv, i) => Object.assign(ac, { [cv.split("=")[0]]: cv.split("=")[1] }),
//     {}
//   );

// console.log("cccccccccccccccccccccccccccccccccccccccccc", c);

// const getCookieValue = browser.cookies.get("customerBearer");
// console.log(
//   "getCookieValuegetCookieValuegetCookieValuegetCookieValuegetCookieValue",
//   browser.cookies
// );

const api = {
  get: options => async (dispatch, getState) => {
    const state = getState();
    const [success, failure] = options.types;
    const customerBearer = options.customerBearer;
    console.log("customerBearer get", options.customerBearer);
    instance.defaults.headers.common["Authorization"] = customerBearer
      ? customerBearer
      : state.authReducer.bearer;
    const promise = (resolve, reject) => {
      return instance
        .get(options.url)
        .then(res => {
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch(err => {
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });
    };

    return new Promise(promise);
  },
  post: (options, params = null) => async (dispatch, getState) => {
    const state = getState();
    const [success, failure] = options.types;
    const customerBearer = options.customerBearer;
    console.log("customerBearer post", customerBearer);
    instance.defaults.headers.common["Authorization"] = customerBearer
      ? customerBearer
      : state.authReducer.bearer;
    const promise = (resolve, reject) => {
      instance
        .post(options.url, params)
        .then(res => {
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch(err => {
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });
    };

    return new Promise(promise);
  },
  put: (options, params = null) => async (dispatch, getState) => {
    const state = getState();
    const [success, failure] = options.types;
    const customerBearer = options.customerBearer;
    console.log("customerBearer put", customerBearer);
    instance.defaults.headers.common["Authorization"] = customerBearer
      ? customerBearer
      : state.authReducer.bearer;
    const promise = (resolve, reject) => {
      instance
        .put(options.url, params)
        .then(res => {
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch(err => {
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });
    };

    return new Promise(promise);
  },
  delete: options => async (dispatch, getState) => {
    const state = getState();
    const [success, failure] = options.types;
    const customerBearer = options.customerBearer;
    console.log("customerBearer dell", customerBearer);
    instance.defaults.headers.common["Authorization"] = customerBearer
      ? customerBearer
      : state.authReducer.bearer;
    const promise = (resolve, reject) => {
      instance
        .delete(options.url)
        .then(res => {
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch(err => {
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });
    };

    return new Promise(promise);
  }
};

export { api, getToken };
