import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addToCartProduct,
    getCartProduct,
    createCart
} from "../../store/actions/cartActions";
import { ToastContainer, toast } from 'react-toastify';
import { bindActionCreators } from "redux";
import 'react-toastify/dist/ReactToastify.css';

import { addToCart } from './../../utils/addToCart';

class QuickView extends Component {

    state = {
        quantity: 1,
        max: 10,
        min: 1
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

        setTimeout(() => { this.props.closeModal() }, 5000);
    }

    handleProductAddToCart = async (e, data) => {
        e.preventDefault();
        const { createCart } = this.props;
        const cartID = sessionStorage.getItem("cartID");
        data.quantity = 1;

        if (!cartID) {
            await createCart();
        }

        await addToCart(this.props, toast, data);
    };

    IncrementItem = () => {
        this.setState(prevState => {
            if (prevState.quantity < 10) {
                return {
                    quantity: prevState.quantity + 1
                };
            } else {
                return null;
            }
        });
    };

    DecreaseItem = () => {
        this.setState(prevState => {
            if (prevState.quantity > 1) {
                return {
                    quantity: prevState.quantity - 1
                };
            } else {
                return null;
            }
        });
    };

    render() {
        const { quantity } = this.state;
        const { closeModal, dataList, productDetail } = this.props;
        let img = productDetail.custom_attributes.find(att => att.attribute_code === "image");
        img = img ? `${process.env.productImage}${img.value}` : 'https://www.laglattmart.com/media/catalog/product/placeholder/default/placeholder_0_2.jpg'
        return (
            <div className="modal fade productQuickView show" style={{ paddingRight: '16px', display: 'block' }}>
                <ToastContainer />
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" onClick={closeModal} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i className="fas fa-times"></i></span>
                        </button>
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <div className="productQuickView-image">
                                    <img src={img} alt="image" />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="product-content">
                                    <h3><a href="#">{productDetail.name}</a></h3>

                                    <div className="price">
                                        <span className="new-price">${productDetail.price}</span>
                                    </div>

                                    <div className="product-add-to-cart">
                                        { productDetail.status === 1 ?
                                            <div className="input-counter">
                                                <span
                                                    className="minus-btn"
                                                    onClick={this.DecreaseItem}
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    value={quantity}
                                                    min={this.state.min}
                                                    max={this.state.max}
                                                />
                                                <span
                                                    className="plus-btn"
                                                    onClick={this.IncrementItem}
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
                                            className="btn btn-primary"
                                            onClick={(e) => this.handleProductAddToCart(e, dataList)}
                                        >
                                            <i className="fas fa-cart-plus"></i> Add to Cart
                                        </button>
                                    </div>

                                    <a href="#" className="view-full-info">View full info</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productDetail: state.productReducer.productDetail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCartProduct: bindActionCreators(addToCartProduct, dispatch),
        getCartProduct: bindActionCreators(getCartProduct, dispatch),
        createCart: bindActionCreators(createCart, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuickView)
