import React, { Component } from 'react';
import Link from 'next/link';

const useTagFunc = () => {
    let useTag = '<use xlink:href="#star" />';
    return <svg className="star" dangerouslySetInnerHTML={{__html: useTag }} />;
}

class DetailsTab extends Component {

    openTabSection = (evt, tabNmae) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabs_item");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove("fadeInUp");
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByTagName("li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("current", "");
        }

        document.getElementById(tabNmae).style.display = "block";
        document.getElementById(tabNmae).className += " fadeInUp animated";
        evt.currentTarget.className += "current";
    }

    render() {
        const { productDetail } = this.props;
        const description = productDetail.custom_attributes.find(att => att.attribute_code === "description");
        const unitValue = productDetail.custom_attributes.find(att => att.attribute_code === "c2c_unit_value");
        const unit = productDetail.custom_attributes.find(att => att.attribute_code === "c2c_unit");
        const weight = productDetail.custom_attributes.find(att => att.attribute_code === "c2c_weight_per_item");
        return (
            <div className="col-lg-12 col-md-12">
                <div className="tab products-details-tab">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <ul className="tabs">
                                <li 
                                    onClick={(e) => {e.preventDefault(); this.openTabSection(e, 'tab1')}}
                                    className="current"
                                >
                                    <a href="#">
                                        <div className="dot"></div> Description
                                    </a>
                                </li>
                                
                                <li onClick={(e) => {e.preventDefault(); this.openTabSection(e, 'tab2')}}>
                                    <a href="#">
                                        <div className="dot"></div> Additional information
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-12 col-md-12">
                            <div className="tab_content">
                                <div id="tab1" className="tabs_item">
                                    <div className="products-details-tab-content">
                                        <p>{description ? description.value : ""}</p>
                                    </div>
                                </div>

                                <div id="tab2" className="tabs_item">
                                    <div className="products-details-tab-content">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>SKU:</td>
                                                        <td>{productDetail.sku}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Weight per Item:</td>
                                                        <td>{weight ? weight.value : "N/A"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Unit Value:</td>
                                                        <td>{unitValue ? unitValue.value : ""}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Units:</td>
                                                        <td>{ unit ? unit.value === "10473" ? "OZ" : "LB" : ""}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsTab;
