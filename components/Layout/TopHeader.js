import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'debounce';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { searchProducts } from '../../store/actions/productActions';

class TopHeader extends Component {
    constructor() {
        super();

        this.state = {
            searchStr: '',
            loading: false,
            options: []
        };
        this.handleSearchForm = debounce(this.handleSearchForm, 500);
    }

    componentDidUpdate(oldProps) {
        const { searched } = this.props;
        if (oldProps.searched !== searched) {
            this.setState({ options: searched });
        }
    }

    handleSearchForm = async str => {
        this.setState({ loading: true, searchStr: str });
        try {
            await this.props.searchProducts(str, 1);
            this.setState({ loading: false });
        } catch {
            this.setState({ loading: false, options: [] });
        }
    }

    handlePaginate = () => {
        const { router } = this.props;
        const { searchStr } = this.state;
        router.push(`/catalog-search/${searchStr}?page=1`);
    }

    render() {
        return (
            <React.Fragment>
                <div className="top-header">
                    <div className="container d-flex align-items-center justify-content-between">
                        <div className="row align-items-center justify-space-between">
                            <div className="logo">
                                <Link href="/">
                                    <a className="navbar-brand">
                                        <img src={require("../../images/logo.jpg")} alt="logo" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="search">
                            <AsyncTypeahead
                                id="search"
                                className="search-input"
                                labelKey="name"
                                name="search"
                                placeholder="Search"
                                maxResults={5}
                                minLength={2}
                                options={this.state.options}
                                isLoading={this.state.loading}
                                onSearch={this.handleSearchForm}
                                filterBy={(option, props) => {
                                    if (props.options.length) {
                                        return true;
                                    }
                                    return false;
                                }}
                                renderMenuItemChildren={(option) => {
                                    let img = option.custom_attributes.find(att => att.attribute_code === "image");
                                    img = img ? `${process.env.productImage}${img.value}` : 'https://www.laglattmart.com/media/catalog/product/placeholder/default/placeholder_0_2.jpg';
                                    return (
                                        <Link
                                            key={option.id}
                                            href={`/product-details/${option.sku}`}
                                        >
                                            <div className="d-flex align-items-center">
                                                <img className="search-item-image" src={img} />
                                                <span>{option.name}</span>
                                            </div>
                                        </Link>
                                    )
                                }}
                            />

                            <button className="search-button" onClick={this.handlePaginate}><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searched: state.productReducer.searched
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchProducts: bindActionCreators(searchProducts, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopHeader));
