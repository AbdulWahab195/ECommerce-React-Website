import React, { Component } from "react";
import Link from "next/link";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Breadcrumb from "../components/Common/Breadcrumb";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "./../store/actions/authActions";
import Router from "next/router";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loginData !== this.props.loginData) {
      if (this.props.loginData) {
        document.cookie =
          encodeURIComponent("customerBearer") +
          "=" +
          encodeURIComponent(this.props.loginData);
        Router.push("/");
      }

      console.log("login datta", this.props.loginData);
    }
  }

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  };

  submituserRegistration = e => {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["emailid"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });
    }

    const data = {
      username: this.state.fields.emailid,

      password: this.state.fields.password
    };
    const { login } = this.props;

    login(data).then(response => {
      document.cookie = encodeURIComponent(response.payload).split(";");
    });
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "*Please enter correct password.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Breadcrumb title="Login" />
        <section className="login-area ptb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="login-content">
                  <div className="section-title">
                    <h2>Login</h2>
                  </div>

                  <form
                    className="login-form"
                    onSubmit={this.submituserRegistration}
                  >
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        id="emailid"
                        name="emailid"
                        value={this.state.fields.emailid}
                        onChange={this.handleChange}
                      />
                      <div className="errorMsg">
                        {this.state.errors.emailid}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        id="password"
                        name="password"
                        value={this.state.fields.password}
                        onChange={this.handleChange}
                      />
                      <div className="errorMsg">
                        {this.state.errors.password}
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>

                    <Link href="#">
                      <a className="forgot-password">Lost your password?</a>
                    </Link>
                  </form>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="new-customer-content">
                  <div className="section-title">
                    <h2>New Customer</h2>
                  </div>

                  <span>Create a Account</span>
                  <p>
                    Sign up for a free account at our store. Registration is
                    quick and easy. It allows you to be able to order from our
                    shop. To start shopping click register.
                  </p>
                  <Link href="/signup">
                    <a className="btn btn-light">Create A Account</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginData: state.authReducer.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(login, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
