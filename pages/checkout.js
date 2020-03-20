import React, { Component } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Breadcrumb from '../components/Common/Breadcrumb';
import CheckoutForm from '../components/checkout/CheckoutForm';

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Breadcrumb title="Checkout" />
                <CheckoutForm />
                <Footer />
            </React.Fragment>
        );
    }
}

export default Index;
