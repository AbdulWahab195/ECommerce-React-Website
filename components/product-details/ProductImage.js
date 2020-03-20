import React, { Component } from 'react';
import Slider from "react-slick";

class ProductImage extends Component {
    render() {
        const { productDetail } = this.props;
        let img = productDetail.custom_attributes.find(att => att.attribute_code === "image");
        img = img ? `${process.env.productImage}${img.value}` : 'https://www.laglattmart.com/media/catalog/product/placeholder/default/placeholder_0_2.jpg';
        return (
            <div className="col-lg-6 col-md-6">
                <div className="products-page-gallery">
                    <div className="product-page-gallery-main">
                        <div className="item">
                            <img src={img} alt="image" />
                        </div>
                    </div>

                    <div className="product-page-gallery-preview">
                        <div className="item">
                            <img src={img} alt="image" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductImage;
