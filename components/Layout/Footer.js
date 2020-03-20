import React, { Component } from 'react';
import Link from "next/link";

class Footer extends Component {
    render() {
        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer-widget">
                                <h3>My Account</h3>

                                <ul className="quick-links">
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Orders History</a></li>
                                    <li><a href="#">Advanced Search</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Contact Information</h3>

                                <ul className="footer-contact-info">
                                    <li><i className="fas fa-map-marker-alt"></i> 8708 W Pico Blvd, Los Angeles, CA 90035</li>
                                    <li><i className="fas fa-phone"></i><a href="#"> (310) 289-6888</a></li>
                                    <li><i className="far fa-envelope"></i><a href="#"> info@laglattmart.com  </a></li>
                                    <li><i className="fas fa-fax"></i><a href="#"> Open 7:30AM–8:30PM</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Our Products</h3>

                                <ul className="information-links">
                                    <li><a href="#">Grocries</a></li>
                                    <li><a href="#">Produce</a></li>
                                    <li><a href="#">Fridge</a></li>
                                    <li><a href="#">Freezer</a></li>
                                    <li><a href="#">Fish</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Be the First to Know</h3>
                                <p>
                                    Get all the latest information on Events, Sales and Offers. Sign up for
                                    newsletter today.
                                </p>
                                <p>Enter your e-mail Address</p>
                                <form>
                                    <input type="email" className="form-control" name="email" required={true} />
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <p>© Copyrite 2020, Site Designed and Developed by iMationSoft</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
