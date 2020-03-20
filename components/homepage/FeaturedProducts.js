import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast, Slide } from "react-toastify";
import { addToCart } from './../../utils/addToCart';
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import QuickView from "../Modal/QuickView";
import {
  addToCartProduct,
  getCartProduct,
  createCart
} from "../../store/actions/cartActions";

import { featuredProducts } from "../../store/actions/productActions";

const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  loop: true,
  nav: true,
  dots: false,
  autoplayHoverPause: true,
  autoplay: true,
  navText: [
    "<i class='fas fa-chevron-left'></i>",
    "<i class='fas fa-chevron-right'></i>"
  ],
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    768: {
      items: 2
    },
    1024: {
      items: 3
    },
    1200: {
      items: 4
    }
  }
};

class FeaturedProducts extends Component {
  state = {
    display: false,
    dataList: []
  };

  componentDidMount() {
    this.setState({ display: true });
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  handleModalData = (image, price, id, data) => {
    this.setState({
      modalImage: image,
      price: price,
      idd: id,
      dataList: data
    });
  };

  handleProductAddToCart = async (e, data) => {
    e.preventDefault();
    const { createCart } = this.props;
    const cartID = sessionStorage.getItem("cartID");
    data.quantity = 1;

    if(!cartID) {
      await createCart();
    }

    await addToCart(this.props, toast, data);
  };

  render() {
    let { featured } = this.props;
    const { modalOpen, dataList } = this.state;
    return (
      <section className="trending-products-area pb-60">
        <ReactTooltip />
        <ToastContainer transition={Slide} />
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
          </div>

          <div className="row">
            {this.state.display ? (
              <OwlCarousel
                className="trending-products-slides owl-carousel owl-theme"
                {...options}
              >
                {featured.map(data => {
                  let img = data.custom_attributes.find(
                    att => att.attribute_code === "image"
                  );
                  img = img
                    ? `${process.env.productImage}${img.value}`
                    : "https://www.laglattmart.com/media/catalog/product/placeholder/default/placeholder_0_2.jpg";
                  return (
                    <div
                      className="col-lg-12 col-md-12 single-product-box"
                      key={data.id}
                    >
                      <div className="product-image">
                        <Link
                          href="/product-details/[product]"
                          as={`/product-details/${data.sku}`}
                        >
                          <a className="image-container">
                            <img src={img} alt="image" />
                          </a>
                        </Link>

                        <ul>
                          <li>
                            <Link href="#">
                              <a
                                data-tip="Quick View"
                                data-place="left"
                                onClick={e => {
                                  e.preventDefault();
                                  this.openModal();
                                  this.handleModalData(
                                    data.quickView,
                                    data.price,
                                    data.id,
                                    data
                                  );
                                }}
                              >
                                <i className="far fa-eye"></i>
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <a data-tip="Add to Wishlist" data-place="left">
                                <i className="far fa-heart"></i>
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <a data-tip="Add to Compare" data-place="left">
                                <i className="fas fa-sync"></i>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="product-content">
                        <h3>
                          <a>{data.name}</a>
                        </h3>

                        <div className="product-price">
                          <span className="new-price">${data.price}</span>
                        </div>
                        <Link href="#">
                          <a
                            disabled={data.status === 2}
                            className="btn btn-light"
                            onClick={e => {
                              e.preventDefault();
                              this.handleProductAddToCart(e, data);
                            }}
                          >
                            Add to Cart
                          </a>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
        </div>
        {modalOpen ? (
          <QuickView
            closeModal={this.closeModal}
            idd={this.state.idd}
            image={this.state.modalImage}
            price={this.state.price}
            dataList={dataList}
          />
        ) : (
          ""
        )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    featured: state.productReducer.featured,
    products: state.productReducer.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCartProduct: bindActionCreators(addToCartProduct, dispatch),
    getCartProduct: bindActionCreators(getCartProduct, dispatch),
    createCart: bindActionCreators(createCart, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);
