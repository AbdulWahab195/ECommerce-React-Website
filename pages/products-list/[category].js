import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import Breadcrumb from '../../components/Common/Breadcrumb';
import LeftSidebar from '../../components/Sidebar/LeftSidebar';
import ProductsFilterOptions from '../../components/Common/ProductsFilterOptions';
import ProductsCard from '../../components/products/ProductsCard';

import { getCategory, getProductsByCategory } from '../../store/actions/categoryActions';

class Index extends Component {

    state = {
        gridClass: ''
    }

    handleGrid = (e) => {
        this.setState({
            gridClass: e
        });
    }

    render() {
        const { gridClass } = this.state;
        const { category } = this.props;
        return (
            <React.Fragment>
                <Navbar />
                <Breadcrumb title={category.name} />

                <section className="products-collections-area ptb-60">
                    <div className="container">
                        <div className="section-title">
                            <h2>{category.name}</h2>
                        </div>

                        <div className="row">
                            {/* <LeftSidebar /> */}
 
                            <div className="col-lg-12 col-md-12">
                                <ProductsFilterOptions onClick={this.handleGrid} pagination={this.props.pagination} />

                                <div id="products-filter" className={`products-collections-listing row ${gridClass}`}>
                                    <ProductsCard products={this.props.products} /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </React.Fragment>
        );
    }
}

Index.getInitialProps = async ({ store, query: { category, page } }) => {
    await store.dispatch(getCategory(category));
    await store.dispatch(getProductsByCategory(category, page));
}

const mapStateToProps = state => {
    return {
        category: state.categoryReducer.category,
        pagination: state.productReducer.pagination,
        products: state.productReducer.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCategory: bindActionCreators(getCategory, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));