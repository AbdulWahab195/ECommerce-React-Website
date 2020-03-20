import React, { Component } from 'react';
import Link from 'next/link';

class MegaMenu extends Component {

    state = {
        display: false,
        collapsed: true
    };

    componentDidMount() {
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0);
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { collapsed } = this.state;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

        let { categories } = this.props;
        return (
            <React.Fragment>
            <div className="navbar-area">
                <div id="navbar" className="glattmart-nav">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <button 
                                onClick={this.toggleNavbar} 
                                className={classTwo}
                                type="button" 
                                data-toggle="collapse" 
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                aria-expanded="false" 
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className={classOne} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    { categories.map(category => {
                                        return (
                                            <li className="nav-item p-relative" key={category.id}>
                                                <Link href={`/products-list/${category.id}?page=1`}>
                                                    <a className="nav-link">
                                                        {category.name}
                                                        { category.children_data.length > 0 &&
                                                            <i className="fas fa-chevron-down"></i>
                                                        }
                                                    </a>
                                                </Link>
                                                { category.children_data.length > 0 &&
                                                    <ul className="dropdown-menu">
                                                        { category.children_data.map(child => {
                                                            return (
                                                                <li className="nav-item" key={child.id}>
                                                                    <Link href={`/products-list/${child.id}?page=1`}>
                                                                        <a className="nav-link active">{child.name}</a>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                }
                                            </li> 
                                        )
                                    })}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default MegaMenu;
