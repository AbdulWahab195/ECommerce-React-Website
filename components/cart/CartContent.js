import React, { Component } from "react";
import Link from "next/link";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CartProduct from "./CartProduct";
import { ToastContainer, toast, Slide } from "react-toastify";
import {
  getCartProduct
} from "../../store/actions/cartActions";
import "react-toastify/dist/ReactToastify.css";

class CartContent extends Component {
  state = {
    cartItems: [],
    gettotal: "0"
  };

  componentDidMount() {
    const { getCartProduct } = this.props;
    getCartProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartList !== this.props.cartList) {
      this.setState({ cartItems: this.props.cartList });

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

  handleChecked = e => {
    if (e.target.checked) {
      this.props.addShipping();
      toast.success("Added $6 into total", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } else {
      this.props.substractShipping();
      toast.error("Removed $6 from total", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  render() {
    const { gettotal, cartItems } = this.state;
    return (
      <section className="cart-area ptb-60">
        <ToastContainer transition={Slide} />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <form>
                <div className="cart-table table-responsive">
                  <CartProduct />
                </div>

                <div className="cart-buttons">
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-md-7">
                      <div className="continue-shopping-box">
                        <Link href="/">
                          <a className="btn btn-light">Continue Shopping</a>
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-5 text-right">
                      <label>
                        <input
                          type="checkbox"
                          ref="shipping"
                          onChange={this.handleChecked}
                        />
                        <span>Shipping(+0$)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="cart-totals">
                  <h3>Cart Totals</h3>

                  <ul>
                    <li>
                      Subtotal <span>${cartItems && (cartItems.length > 0 ? gettotal : 0)}</span>
                    </li>
                    <li>
                      Shipping <span>$0.00</span>
                    </li>
                    <li>
                      Total{" "}
                      <span>
                        <b>${gettotal + 0}</b>
                      </span>
                    </li>
                  </ul>
                  <Link href="/checkout">
                    <a className="btn btn-light">Proceed to Checkout</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContent);
