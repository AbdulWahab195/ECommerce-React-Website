import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  getCartProduct,
  removeCartProduct,
  addToCartProduct,
  createCart,
  updateCartProduct
} from "../../store/actions/cartActions";

import {
  searchProducts
} from "../../store/actions/productActions";

class Cart extends Component {
  state = {
    display: false,
    cartList: [],
    qty: 1,
    max: 10,
    min: 1,
    gettotal: "0",
    productId: ''
  };

  componentDidMount() {
    const { getCartProduct } = this.props;
    getCartProduct();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.cartList !== this.props.cartList) {
      this.setState({ cartList: this.props.cartList });
      const items = [];
      const { searchProducts } = this.props;
      for (let index = 0; index < this.props.cartList.length; index++) {
        const result = await searchProducts(this.props.cartList[index].name, 1);
        items.push(this.props.cartList[index]);
        items[index].image = result.payload.items[0].media_gallery_entries.length === 0 ? '' : result.payload.items[0].media_gallery_entries[0].file;
        const custom_attribute_obj = result.payload.items[0].custom_attributes.find(x => x.attribute_code === 'c2c_link_sku');
        if(custom_attribute_obj) {
          items[index].customAttributeLink = true;
          items[index].customAttributeLinkValue = custom_attribute_obj.value;
        } else {
          items[index].customAttributeLink = false;
          items[index].customAttributeLinkValue = 0;
        }
        items[index].weight = result.payload.items[0].custom_attributes.find(att => att.attribute_code === "c2c_weight_per_item");
      }
      this.setState({
        cartList: items
      })
      this.countTotalPrice(this.props.cartList);
    }
  }

  countTotalPrice = cartList => {
    const { selectedUnit } = this.props;
    if (cartList && cartList.length > 0) {
      let getPrice = cartList.map(item =>
        item.weight ? selectedUnit === "LB" ?
          item.price * parseFloat(item.weight.value) * item.qty :
          parseFloat(item.weight.value) * item.price * item.qty :
          item.qty * item.price
      );
      let gettotal = getPrice.reduce(function (qty, val) {
        return qty + val;
      }, 0);
      if (gettotal) {
        this.setState({
          gettotal: gettotal.toFixed(2)
        });
      }
    }
  };

  checkTheIndex = value => {
    return value;
  };

  handleProductRemove = id => {
    console.log(id);
    const { removeCartProduct, getCartProduct } = this.props;
    removeCartProduct(id)
      .then((res) => {
        const product = this.state.cartList.find(x=>x.item_id === id);
        if (product && product.customAttributeLink) {
          const obj = this.state.cartList.find(x => x.sku === product.customAttributeLinkValue);
          if (obj) {
            removeCartProduct(obj.item_id)
              .then(() => {
                getCartProduct();
              });
          } else {
            getCartProduct();
          }
        } else {
          getCartProduct();
        }
      });
  };

  handleProductAdd = async (e, product, qty) => {
    e.preventDefault();

    const { addToCartProduct, getCartProduct, createCart } = this.props;
    const cartID = sessionStorage.getItem("cartID");
    product.qty = qty;
    if (!cartID) {
      await createCart();
    }

    await addToCartProduct(product, qty);
    getCartProduct();
  };

  onChangeUpdateQuantity = (e) => {
    const value = e.target.value;

    this.setState({ qty: value });
  };

  closeCart = () => {
    this.props.onClick(this.state.display);
  };

  IncrementItem = (e, product, qty) => {
    console.log(e, product, qty);
    const { updateCartProduct, getCartProduct } = this.props;
    e.persist();
    if (product.qty < 10) {
      updateCartProduct(product.item_id, qty + 1)
      .then(() => {
        if(product.customAttributeLink) {
          const obj = this.state.cartList.find(x => x.sku === product.customAttributeLinkValue);
          if(obj) {
            updateCartProduct(obj.item_id, qty + 1)
            .then(() => {
              getCartProduct();
            });
          } else{
            getCartProduct();
          }
        }
      })
    }
  };

  DecreaseItem = (e, product, qty) => {
    console.log(e, product, qty);
    const { updateCartProduct, getCartProduct } = this.props;
    e.persist();
    if (product.qty > 1) {
      updateCartProduct(product.item_id, qty - 1)
      .then(() => {
        if (product.customAttributeLink) {
          const obj = this.state.cartList.find(x => x.sku === product.customAttributeLinkValue);
          if (obj) {
            updateCartProduct(obj.item_id, qty - 1)
            .then(() => {
              getCartProduct();
            });
          } else {
            getCartProduct();
          }
        }
      })
    }
  };

  render() {
    const { gettotal, cartList, productId, qty } = this.state;
    return (
      <div
        className="modal right fade show shoppingCartModal"
        style={{
          display: "block",
          paddingRight: "16px"
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.closeCart}
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <div className="modal-body">
              <h3>My Cart ({cartList.length})</h3>

              <div className="product-cart-content">
                {cartList.length > 0
                  ? cartList.map((product, idx) => (
                    
                    <div className="product-cart" key={idx}>
                      <div className="product-image">
                        <img
                          src={`https://glattmage.testmagento.co/pub/media/catalog/product${product.image}`}
                          alt="image"
                        />
                      </div>

                      <div className="product-content">
                        <button
                          onClick={() => this.handleProductRemove(product.item_id)}
                          type="button"
                          className="close"
                        >
                          <span>×</span>
                        </button>
                        <h3>
                          <Link href="#">{product.name}</Link>
                        </h3>

                        { product.weight &&
                        <div className="product-estimate-weight">
                            <span className="est-weight">Est. total weight { (parseFloat(product.weight.value) * product.qty).toFixed(2) } LB</span>
                        </div> }

                        <div className="product-details-content product-qty-add">
                          <div className="product-add-to-cart">
                            <div className="input-counter">
                              <span
                                className="minus-btn"
                                onClick={(e) => this.DecreaseItem(e, product, product.qty)}
                              >
                                <i className="fas fa-minus"></i>
                              </span>
                              <input
                                type="text"
                                min={this.state.min}
                                max={this.state.max}
                                value={product.qty}
                              />
                              <span
                                className="plus-btn"
                                onClick={(e) => this.IncrementItem(e, product, product.qty)}
                              >
                                <i className="fas fa-plus"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="product-price">
                          <span className="price"> {product.qty} </span>
                          <span>x</span>
                          <span className="price">$ {product.price}</span>
                        </div>
                      </div>
                    </div>
                  ))
                  : "Empty"}
              </div>

              <div className="product-cart-subtotal">
                <span>Subtotal</span>

                <span className="subtotal">${cartList && cartList.length > 0 ? gettotal : 0}</span>
              </div>

              <div className="product-cart-btn">
                <Link href="/checkout">
                  <a className="btn btn-primary">Proceed to Checkout</a>
                </Link>
                <Link href="/cart">
                  <a className="btn btn-light">View Shopping Cart</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartProduct: bindActionCreators(getCartProduct, dispatch),
    removeCartProduct: bindActionCreators(removeCartProduct, dispatch),
    updateCartProduct: bindActionCreators(updateCartProduct, dispatch),
    addToCartProduct: bindActionCreators(addToCartProduct, dispatch),
    createCart: bindActionCreators(createCart, dispatch),
    searchProducts: bindActionCreators(searchProducts, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    total: state.cartReducer.total,
    cartList: state.cartReducer.cartItems,
    selectedUnit: state.cartReducer.selectedUnit
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
