import React, { Component } from "react";
import Navbar from "../components/Layout/Navbar";
import Banner from "../components/homepage/Banner";
import CategoryProducts from "../components/homepage/CategoryProducts";
import FeaturedProducts from "../components/homepage/FeaturedProducts";
import Footer from "../components/Layout/Footer";
import AddsModal from "../components/Modal/AddsModal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomerBearer } from "./../store/actions/authActions";

import { featuredProducts } from "../store/actions/productActions";

class Index extends Component {
  componentDidMount() {
    const { getCustomerBearer } = this.props;
    const getSession =
      window.sessionStorage && sessionStorage.getItem("customerBearer");
    getCustomerBearer(getSession);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Banner />
        <CategoryProducts />
        <FeaturedProducts />
        <Footer />
        <AddsModal />
      </React.Fragment>
    );
  }
}
Index.getInitialProps = async ({ store }) => {
  await store.dispatch(featuredProducts(605, 1));
};

const mapDispatchToProps = dispatch => {
  return {
    getCustomerBearer: bindActionCreators(getCustomerBearer, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Index);
