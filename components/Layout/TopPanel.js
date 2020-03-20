import React, { Component } from "react";
import { bindActionCreators } from "redux";
import Link from "next/link";
import { connect } from "react-redux";
import Wishlist from "../Modal/Wishlist";
import Cart from "../Modal/Cart";
import {
  getCartProduct
} from "../../store/actions/cartActions";

class TopPanel extends Component {
  state = {
    display: false,
    cart: false,
    cartList: []
  };

  componentDidMount() {
    const { getCartProduct } = this.props;
    getCartProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartList !== this.props.cartList) {
      this.setState({ cartList: this.props.cartList });
    }
  }

  handleCart = () => {
    this.setState(prevState => {
      return {
        cart: !prevState.cart
      };
    });
  };

  handleWishlist = () => {
    this.setState(prevState => {
      return {
        display: !prevState.display
      };
    });
  };

  render() {
    const { cartList } = this.state;

    return (
      <React.Fragment>
        <div className="top-panel">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-6">
                <ul className="top-header-nav">
                  <li>
                    <i className="fas fa-phone"></i> Call Us: (310) 289-6888
                  </li>
                  <li className="social-icons">
                    <Link href="/">
                      <a>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </Link>
                  </li>
                  <li className="social-icons">
                    <Link href="/">
                      <a>
                        <i className="fab fa-twitter"></i>
                      </a>
                    </Link>
                  </li>
                  <li className="social-icons">
                    <Link href="/">
                      <a>
                        <i className="fab fa-instagram"></i>
                      </a>
                    </Link>
                  </li>
                  <li className="social-icons">
                    <Link href="/">
                      <a>
                        <i className="fab fa-pinterest"></i>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-5 col-md-6">
                <ul className="top-header-right-nav">
                  <li>
                    <Link href="/compare">
                      <a>My Account</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        data-toggle="modal"
                        data-target="#shoppingWishlistModal"
                        onClick={e => {
                          e.preventDefault();
                          this.handleWishlist();
                        }}
                      >
                        Wishlist <i className="far fa-heart"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          this.handleCart();
                        }}
                      >
                        Cart({
                          cartList && cartList.length
                        }){" "}
                        <i className="fas fa-shopping-bag"></i>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {this.state.display ? <Wishlist onClick={this.handleWishlist} /> : ""}
        {this.state.cart ? <Cart onClick={this.handleCart} /> : ""}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartList: state.cartReducer.cartItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartProduct: bindActionCreators(getCartProduct, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel);
