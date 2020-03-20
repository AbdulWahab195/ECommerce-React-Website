import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

class CategoryProducts extends Component {
    render() {
        const { categories } = this.props;
        return (
            <section className="category-products-area ptb-60">
                <div className="container">
                    <div className="row">
                        { categories.map((category, i) =>
                            i < 8 &&
                            <div key={category.id} className="col-lg-3 col-md-12">
                                <div className="single-category-box">
                                    <img src={category.image} alt="image" />

                                    <div className="category-content">
                                        <h3>{category.name.toUpperCase()}</h3>
                                        <Link href={`/products-list/${category.id}?page=1`}>
                                            <button className="btn btn-light">View</button>
                                        </Link>
                                    </div>

                                    {/* <Link href="#">
                                        <a className="link-btn"></a>
                                    </Link> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categoryReducer.categories
    };
};

export default connect(mapStateToProps, null)(CategoryProducts);
