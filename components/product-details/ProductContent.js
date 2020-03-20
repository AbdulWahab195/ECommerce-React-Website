import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import Link from 'next/link';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Shipping from './Shipping';
import {
    setUnit,
    getCartProduct,
    addToCartProduct,
    createCart
} from "../../store/actions/cartActions";
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from './../../utils/addToCart';

class ProductContent extends Component {
    state = {
        quantity: 1,
        max: 10,
        min: 1,
        shipModal: false,
        productId: ''
    };

    handleAddToCartFromView = () => {

        toast.success('Added to the cart', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    handleProductAddToCart = async (e, data) => {
        e.preventDefault();
        const { createCart } = this.props;
        const { quantity, productId } = this.state;
        data.quantity = data.id === productId ? quantity : 1;
        const cartID = sessionStorage.getItem("cartID");
        if(!cartID) {
            await createCart();
        }
        await addToCart(this.props, toast, data);
    };

    IncrementItem = (product) => {
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

    DecreaseItem = (product) => {
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

    openShipModal = () => {
        this.setState({ shipModal: true });
    }

    closeShipModal = () => {
        this.setState({ shipModal: false });
    }

    render() {
        const { shipModal, productId, quantity } = this.state;
        const { productDetail, selectedUnit } = this.props;
        const description = productDetail.custom_attributes.find(att => att.attribute_code === "description").value;
        const stock = productDetail.extension_attributes.stock_item;
        const weight = productDetail.custom_attributes.find(att => att.attribute_code === "c2c_weight_per_item");

        return (
            <React.Fragment>
                <div className="col-lg-6 col-md-6">
                    <ToastContainer />
                    <div className="product-details-content">
                        <h3>{productDetail.name}</h3>

                        <div className="price">
                            <span className="new-price">
                                ${selectedUnit === "LB" ? productDetail.price : parseFloat(productDetail.price * weight.value).toFixed(2)} { selectedUnit === "LB" && weight && "/ LB" }
                            </span>
                        </div>

                        <p>{description}</p>

                        <ul className="product-info">
                            <li><span>Availability:</span> <a href="#">
                                {stock.qty > 0 ? ` In stock (${stock.qty} items)` : " Not Available"}
                            </a></li>
                        </ul>

                        <div className="product-info-btn">
                            <Link href="#">
                                <a
                                    onClick={e => {
                                        e.preventDefault();
                                        this.openShipModal();
                                    }}
                                >
                                    <i className="fas fa-truck"></i> Shipping
                                </a>
                            </Link>
                        </div>
                        
                        { weight &&
                        <div className="product-estimate-weight">
                            <span className="est-weight">Est. total weight { (weight.value * quantity).toFixed(2) } LB</span>
                        </div> }

                        <div className="product-add-to-cart">
                            { productDetail.status === 1 ?
                                <div className="input-counter">
                                    <span
                                        className="minus-btn"
                                        onClick={() => this.DecreaseItem(productDetail)}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </span>
                                    <input
                                        type="text"
                                        value={productId === productDetail.id ? quantity : 1}
                                        min={this.state.min}
                                        max={this.state.max}
                                    />
                                    <span
                                        className="plus-btn"
                                        onClick={() => this.IncrementItem(productDetail)}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </span>
                                </div> :
                                <div>
                                    <p className="text-danger">Out of Stock</p>
                                </div>
                            }

                            <button
                                disabled={productDetail.status === 2}
                                type="submit"
                                className="btn btn-primary mr-2"
                                onClick={(e) => this.handleProductAddToCart(e, productDetail)}
                            >
                                <i className="fas fa-cart-plus"></i> Add to Cart
                            </button>
                            <select className="form-control" onChange={this.props.setUnit} value={this.props.selectedUnit}>
                                <option value="LB">Per LB</option>
                                <option value="UNIT">Per Unit</option>
                            </select>
                        </div>

                        {/* <div className="wishlist-compare-btn">
                            <a href="#" className="btn btn-light"><i className="far fa-heart"></i> Add to Wishlist</a>
                            <a href="#" className="btn btn-light"><i className="fas fa-balance-scale"></i> Add to Compare</a>
                        </div>

                        <div className="buy-checkbox-btn">
                            <div className="item">
                                <a href="#" className="btn btn-primary">Buy it now!</a>
                            </div>
                        </div> */}
                    </div>
                </div>
                {shipModal ? <Shipping closeShipModal={this.closeShipModal} /> : ''}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedUnit: state.cartReducer.selectedUnit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCartProduct: bindActionCreators(getCartProduct, dispatch),
        addToCartProduct: bindActionCreators(addToCartProduct, dispatch),
        createCart: bindActionCreators(createCart, dispatch),
        setUnit: bindActionCreators(setUnit, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductContent)