import React, { Component } from "react";
import Link from "next/link";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Breadcrumb from "../components/Common/Breadcrumb";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register } from "./../store/actions/authActions";
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
    if (prevProps.registerData !== this.props.registerData) {
      if (this.props.registerData && this.props.registerData.id) {
        Router.push("/login");
      }
    }
  }

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
    console.log("Field value", this.state.fields);
  };

  submituserRegistration = e => {
    e.preventDefault();

    if (this.validateForm()) {
      let fields = {};
      fields["firstname"] = "";
      fields["lastname"] = "";
      fields["emailid"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });
    }

    const data = {
      customer: {
        email: this.state.fields.emailid,
        firstname: this.state.fields.firstname,
        lastname: this.state.fields.lastname
      },
      password: this.state.fields.password
    };

    const { register } = this.props;
    register(data);
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "*Please enter your first name.";
    }

    if (typeof fields["firstname"] !== "undefined") {
      if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your last name.";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please enter alphabet characters only.";
      }
    }

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
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    console.log("dddddddddddddd", this.props.registerData);
    return (
      <React.Fragment>
        <Navbar />
        <Breadcrumb title="Signup" />
        <section className="signup-area ptb-60">
          <div className="container">
            <div className="signup-content">
              <div className="section-title">
                <h2>Create an Account</h2>
              </div>

              <form
                className="signup-form"
                method="post"
                name="userRegistrationForm"
                onSubmit={this.submituserRegistration}
              >
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your first name"
                    id="firstname"
                    name="firstname"
                    value={this.state.fields.firstname}
                    onChange={this.handleChange}
                  />
                  <div className="errorMsg">{this.state.errors.firstname}</div>
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                    id="lastname"
                    name="lastname"
                    value={this.state.fields.lastname}
                    onChange={this.handleChange}
                  />
                  <div className="errorMsg">{this.state.errors.lastname}</div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email id"
                    id="emailid"
                    name="emailid"
                    value={this.state.fields.emailid}
                    onChange={this.handleChange}
                  />
                  <div className="errorMsg">{this.state.errors.emailid}</div>
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
                  <div className="errorMsg">{this.state.errors.password}</div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Signup
                </button>
                <Link href="/">
                  <a className="return-store">or Return to Store</a>
                </Link>
              </form>
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
    registerData: state.authReducer.register
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: bindActionCreators(register, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
