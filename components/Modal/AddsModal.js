import React, { Component } from 'react';
import Link from 'next/link';

class AddsModal extends Component {
    _isMounted = false;
    state = {
        open: false
    };

    componentDidMount(){
        this.setState({
            open: true
        });
    }

    closeModal = (e) => {
        this._isMounted = true;
        e.preventDefault();
        this.setState({
            open: false
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        let { open } = this.state;
        return (
            <div className={`bts-popup ${open ? 'is-visible' : ''}`} role="alert">
                <div className="bts-popup-container">
                    <h3>Newsletter</h3>
                    <p>Subscribe for our <strong>free offers / discount</strong> newsletter</p>

                    <form>
                        <input type="email" className="form-control" placeholder="mail@name.com" name="EMAIL" required={true} />
                        <button type="submit"><i className="far fa-paper-plane"></i></button>
                    </form>

                    <ul>
                        <li><a href="#" className="facebook"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#" className="twitter"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#" className="instagram"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#" className="pinterest"><i className="fab fa-pinterest"></i></a></li>
                    </ul>

                    <Link href="#">
                        <a onClick={this.closeModal} className="bts-popup-close"></a>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AddsModal;
