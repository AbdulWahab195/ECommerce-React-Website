import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopPanel from './TopPanel';
import TopHeader from './TopHeader';
import MegaMenu from './MegaMenu';

class Navbar extends Component {
    render() {
        return (
            <React.Fragment>
                <TopPanel />
                <TopHeader />
                <MegaMenu categories={this.props.categories} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categoryReducer.categories
    };
};

export default connect(mapStateToProps, null)(Navbar);
