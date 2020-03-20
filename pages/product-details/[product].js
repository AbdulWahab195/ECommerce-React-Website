import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../../components/Layout/Navbar';
import Breadcrumb from '../../components/Common/Breadcrumb';
import Footer from '../../components/Layout/Footer';
import ProductImage from '../../components/product-details/ProductImage';
import ProductContent from '../../components/product-details/ProductContent';
import DetailsTab from '../../components/product-details/DetailsTab';
import RelatedProducts from '../../components/product-details/RelatedProducts';

import { getProduct } from '../../store/actions/productActions';

class Index extends Component {
    render() {
        const { productDetail } = this.props;

        return (
            <React.Fragment>
                <Navbar />
                <Breadcrumb title={productDetail.name} />

                <section className="products-details-area pt-60">
                    <div className="container">
                        <div className="row">
                            <ProductImage productDetail={productDetail} />
                            <ProductContent productDetail={productDetail} />
                            <DetailsTab productDetail={productDetail} />
                        </div>
                    </div>

                    <RelatedProducts productID={productDetail.id} categoryID={productDetail.extension_attributes.category_links[0].category_id} />
                </section>

                <Footer />
            </React.Fragment>
        );
    }
}

Index.getInitialProps = async ({ store, query: { product } }) => {
    await store.dispatch(getProduct(product));
}

const mapStateToProps = state => {
    return {
        productDetail: state.productReducer.productDetail
    };
};

const mapDispatchToProps = dispatch => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));;
