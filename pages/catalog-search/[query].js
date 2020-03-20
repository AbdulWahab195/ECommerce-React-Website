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

import { searchProducts } from '../../store/actions/productActions';

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
        const { router: { query: { query } } } = this.props;
        return (
            <React.Fragment>
                <Navbar />
                <Breadcrumb title={query} />

                <section className="products-collections-area ptb-60">
                    <div className="container">
                        <div className="section-title">
                            <h2>Search Results for: {query}</h2>
                        </div>

                        <div className="row">
                            {/* <LeftSidebar /> */}
 
                            <div className="col-lg-12 col-md-12">
                                <ProductsFilterOptions onClick={this.handleGrid} pagination={this.props.pagination} />

                                <div id="products-filter" className={`products-collections-listing row ${gridClass}`}>
                                    <ProductsCard products={this.props.searched} /> 
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

Index.getInitialProps = async ({ store, query: { query, page } }) => {
    await store.dispatch(searchProducts(query, page));
}

const mapStateToProps = state => {
    return {
        pagination: state.productReducer.pagination,
        searched: state.productReducer.searched
    };
};

const mapDispatchToProps = dispatch => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));