import React, { Component } from 'react';
import Link from 'next/link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));
import QuickView from '../Modal/QuickView';

import { featuredProducts } from '../../store/actions/productActions';

const options = {
    loop: true,
    nav: false,
    dots: true,
    autoplayHoverPause: true,
    autoplay: true,
    navText: [
        "<i class='fas fa-chevron-left'></i>",
        "<i class='fas fa-chevron-right'></i>"
    ],
    responsive: {
        0: {
            items: 1,
        },
        576: {
            items: 2,
        },
        768: {
            items: 2,
        },
        1024: {
            items: 3,
        },
        1200: {
            items: 4,
        }
    }
}

class RelatedProducts extends Component {
    state = { 
        display: false
    };

    async componentDidMount() {
        const { featuredProducts, categoryID } = this.props;
        await featuredProducts(categoryID, 1);
        this.setState({ display: true })
    }

    handleAddToCart = (id) => {
        toast.success('Added to the cart', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    render() {
        let { featured, productID } = this.props;
        const { modalOpen } = this.state;
        return (
            <React.Fragment>
                <ReactTooltip />
                <ToastContainer transition={Slide} />
                <div className="related-products-area">
                    <div className="container">
                        <div className="section-title">
                            <h2><span className="dot"></span> Related Products</h2>
                        </div>

                        <div className="row">
                            {this.state.display ? <OwlCarousel 
                                className="trending-products-slides owl-carousel owl-theme"
                                {...options}
                            >
                                {featured.map((data, idx) => {
                                    let img = data.custom_attributes.find(att => att.attribute_code === "image");
                                    img = img ? `${process.env.productImage}${img.value}` : 'https://www.laglattmart.com/media/catalog/product/placeholder/default/placeholder_0_2.jpg'
                                    return (
                                        data.id !== productID &&
                                        <div className="col-lg-12 col-md-12 single-product-box" key={data.id}>
                                            <div className="product-image">
                                                <Link href="/product-details/[product]" as={`/product-details/${data.sku}`}>
                                                    <a className="image-container">
                                                        <img src={img} alt="image" />
                                                    </a>
                                                </Link>
                                            </div>

                                            <div className="product-content">
                                                <h3>
                                                    <a>{data.name}</a>
                                                </h3>

                                                <div className="product-price">
                                                    <span className="new-price">{data.price}</span>
                                                </div>
                                                <Link href="#">
                                                    <a 
                                                        className="btn btn-light"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}

                            </OwlCarousel> : ''}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        featured: state.productReducer.featured
    }
}

const mapDispatchToProps= (dispatch)=>{
    return {
        featuredProducts: bindActionCreators(featuredProducts, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RelatedProducts)