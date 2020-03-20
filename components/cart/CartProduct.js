import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCartProduct,
  removeCartProduct,
  addToCartProduct,
  createCart
} from "../../store/actions/cartActions";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CartProduct extends Component {
  state = {
    cartItems: [],
    gettotal: "0",
    quantity: 1,
    max: 10,
    min: 1,
    productId: ''
  };

  componentDidMount() {
    const { getCartProduct } = this.props;
    getCartProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartList !== this.props.cartList) {
      this.setState({ cartItems: this.props.cartList, productId: '' });

      this.countTotalPrice(this.props.cartList);
    }
  }

  countTotalPrice = cartList => {
    if (cartList && cartList.length > 0) {
      let getPrice = cartList.map(qty => qty.quantity * qty.price);
      let gettotal = getPrice.reduce(function (qty, val) {
        return qty + val;
      }, 0);
      if (gettotal) {
        this.setState({
          gettotal
        });
      }
    }
  };

  handleRemove = id => {
    const { removeCartProduct, getCartProduct } = this.props;
    removeCartProduct(id);
    getCartProduct();
  };

  handleProductAdd = async (e, product, quantity) => {
    e.preventDefault();
    const cartID = sessionStorage.getItem("cartID");
    const { addToCartProduct, getCartProduct, createCart } = this.props;
    product.quantity = quantity;
    if(!cartID) {
      await createCart();
    }

    await addToCartProduct(product, quantity);
    getCartProduct();
  };

  onChangeUpdateQuantity = e => {
    const value = e.target.value;

    this.setState({ quantity: value });
  };

  //to add the quantity
  IncrementItem = (e, product, qty) => {
    this.setState(prevState => {
      if (prevState.quantity < 10) {
        this.handleProductAdd(e, product, qty+1)
        return {
          quantity: qty,
          productId: product.id
        };
      } else {
        return null;
      }
    });
  };
  //to substruct from the quantity
  DecreaseItem = (e, product, qty) => {
    this.setState(prevState => {
      if (prevState.quantity > 1) {
        this.handleProductAdd(e, product, qty-1)
        return {
          quantity: qty - 1,
          productId: product.id
        };
      } else {
        return null;
      }
    });
  };

  render() {
    const { cartItems, quantity, productId } = this.state;

    let cartItemsList = cartItems.length ? (
      cartItems.map((data, idx) => {
        return (
          <tr key={idx}>
            <td className="product-thumbnail">
              <Link href="#">
                <a>
                  <img
                    src={`${process.env.productImage}${data.custom_attributes[1].value}`}
                    alt="item"
                  />
                </a>
              </Link>
            </td>

            <td className="product-name">
              <Link href="#">
                <a>{data.name}</a>
              </Link>
            </td>

            <td className="product-price">
              <span className="unit-amount">${data.price}</span>
            </td>

            <td className="product-quantity">
              <div className="input-counter">
                <span className="minus-btn" onClick={(e) => this.DecreaseItem(e, data, data.quantity)}>
                  <i className="fas fa-minus"></i>
                </span>
                <input
                  type="text"
                  value={productId === data.id ? quantity : data.quantity}
                  min={this.state.min}
                  max={this.state.max}
                />
                <span className="plus-btn" onClick={(e) => this.IncrementItem(e, data, data.quantity)}>
                  <i className="fas fa-plus"></i>
                </span>
              </div>
            </td>

            <td className="product-subtotal">
              <span className="subtotal-amount">
                ${data.price * data.quantity}
              </span>

              <Link href="#">
                <a
                  className="remove"
                  onClick={() => this.handleRemove(data.id)}
                >
                  <i className="far fa-trash-alt"></i>
                </a>
              </Link>
            </td>
          </tr>
        );
      })
    ) : (
        <tr>
          <td className="product-thumbnail" colSpan="5">
            <p>Empty.</p>
          </td>
        </tr>
      );

    return (
      <>
        <ToastContainer transition={Slide} />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Name</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>{cartItemsList}</tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartList: state.cartReducer.cartItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCartProduct: bindActionCreators(getCartProduct, dispatch),
    removeCartProduct: bindActionCreators(removeCartProduct, dispatch),
    addToCartProduct: bindActionCreators(addToCartProduct, dispatch),
    createCart: bindActionCreators(createCart, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
