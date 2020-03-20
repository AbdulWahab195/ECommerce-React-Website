import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  addToCartProduct,
  removeCartProduct,
  getCartProduct,
  createCart
} from "../../store/actions/cartActions";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast, Slide } from "react-toastify";
import QuickView from "../Modal/QuickView";
import { getProduct, currentProduct } from "../../store/actions/productActions";
import { addToCart } from './../../utils/addToCart';
class ProductsCard extends Component {
  state = {
    modalOpen: false,
    modalImage: "",
    price: 0,
    idd: null,
    quantity: 1,
    max: 10,
    min: 1,
    productId: ""
  };

  handleProductAddToCart = async (e, data) => {
    e.preventDefault();
    const { createCart } = this.props;
    const { quantity, productId } = this.state;
    data.quantity = data.id === productId ? quantity : 1;
    const cartID = sessionStorage.getItem("cartID");
    if (!cartID) {
      await createCart();
    }

    await addToCart(this.props, toast, data);
  };

  handleModel = product => {
    const { currentProduct } = this.props;
    currentProduct(product);
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  onChangeQuantity = e => {
    const value = e.target.value;

    this.setState({ quantity: value });
  };

  IncrementItem = product => {
    this.setState(prevState => {
      if (prevState.quantity < 10) {
        return {
          quantity: prevState.quantity + 1,
          productId: product && product.id
        };
      } else {
        return null;
      }
    });
  };

  DecreaseItem = product => {
    this.setState(prevState => {
      if (prevState.quantity > 1) {
        return {
          quantity: prevState.quantity - 1,
          productId: product && product.id
        };
      } else {
        return null;
      }
    });
  };

  render() {
    const { products } = this.props;
    const { modalOpen, productId, quantity } = this.state;

    return (
      <React.Fragment>
        <ReactTooltip />
        <ToastContainer transition={Slide} />
        {products.map((data, index) => {
          let img = data.custom_attributes.find(
            att => att.attribute_code === "image"
          );
          const weight = data.custom_attributes.find(
            att => att.attribute_code === "c2c_weight_per_item"
          );
          img = img ? `${process.env.productImage}${img.value}` : "";
          return (
            <div
              className="col-lg-4 col-sm-6 col-md-4 col-6 products-col-item"
              key={index}
            >
              <div className="single-product-box">
                <div className="product-image">
                  <Link
                    href="/product-details/[product]"
                    as={`/product-details/${data.sku}`}
                  >
                    <a href="#">
                      <img src={img} alt="image" />
                    </a>
                  </Link>

                  <ul>
                    <li>
                      <a
                        data-tip="Quick View"
                        data-place="left"
                        onClick={e => {
                          e.preventDefault();
                          this.handleModel(data);
                        }}
                      >
                        <i className="far fa-eye"></i>
                      </a>
                    </li>
                    <li>
                      <a data-tip="Add to Wishlist" data-place="left">
                        <i className="far fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a data-tip="Add to Compare" data-place="left">
                        <i className="fas fa-sync"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="product-content">
                  <h3>{data.name}</h3>

                  <div className="product-price">
                      <span className="new-price">${data.price} {weight && "/ LB"}</span>
                  </div>
                  {weight && (
                    <div className="product-estimate-weight">
                      <span className="est-weight">
                        Est. total weight {(weight.value * quantity).toFixed(2)}{" "}
                        LB
                      </span>
                    </div>
                  )}

                  <div className="product-details-content">
                    <div className="product-add-to-cart">
                      {data.status === 1 ? (
                        <div className="input-counter mb-10">
                          <span
                            className="minus-btn"
                            onClick={() => this.DecreaseItem(data)}
                          >
                            <i className="fas fa-minus"></i>
                          </span>
                          <input
                            type="text"
                            value={productId === data.id ? quantity : 1}
                            min={this.state.min}
                            max={this.state.max}
                          />
                          <span
                            className="plus-btn"
                            onClick={() => this.IncrementItem(data)}
                          >
                            <i className="fas fa-plus"></i>
                          </span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-danger">Out of Stock</p>
                        </div>
                      )}

                      <button
                        disabled={data.status === 2}
                        type="submit"
                        className="btn btn-primary"
                        onClick={e => this.handleProductAddToCart(e, data)}
                      >
                        <i className="fas fa-cart-plus"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {modalOpen ? <QuickView closeModal={this.handleModel} /> : ""}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getProduct: bindActionCreators(getProduct, dispatch),
    currentProduct: bindActionCreators(currentProduct, dispatch),
    addToCartProduct: bindActionCreators(addToCartProduct, dispatch),
    removeCartProduct: bindActionCreators(removeCartProduct, dispatch),
    getCartProduct: bindActionCreators(getCartProduct, dispatch),
    createCart: bindActionCreators(createCart, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCard);
