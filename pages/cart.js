import React, { Component } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Breadcrumb from '../components/Common/Breadcrumb';
import CartContent from '../components/cart/CartContent';

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Breadcrumb title="Cart" />
                <CartContent />
                <Footer />
            </React.Fragment>
        );
    }
}

export default Index;
