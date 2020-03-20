import React, { Component,useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import DatePicker from "react-datepicker";
import OrderSummary from "./OrderSummary";
import Payment from "../payments/Payment";
import { states } from "./statesList";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import setHours from "date-fns/setHours";
import getDay from "date-fns/getDay";
import addDays from "date-fns/addDays";
import setMinutes from "date-fns/setMinutes";
import { shippingMethod, shippingInfo, processTransaction } from "./../../store/actions/shipActions"

const year = (new Date()).getFullYear();
const years = [year, year+1, year+2, year+3, year+4, year+5, year+6];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];




class CheckoutForm extends Component {
  
  state = {
    shippingTime: '',
    newDate: '',
    startDate: '',
    shipping_address: {
      region: "",
      region_code: "",
      country_id: "US",
      street: [""],
      postcode: "",
      city: "",
      "region_id": 43,
      firstname: "",
      lastname: "",
      email: "",
      telephone: ""
    },
    billing_address: {
      region: "",
      region_code: "",
      country_id: "US",
      "region_id": 43,
      street: [""],
      postcode: "",
      city: "",
      firstname: "",
      lastname: "",
      email: "",
      telephone: ""
    },
    cardInfo: {
      cardNumber: "",
      month: "",
      year: "",
      cardCode: ""
    }, 
    orderSummary: [],
    payment_token: ""
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleSelect = date => {
    this.setState({
      startDate: date
    });
    console.log('2');
  };
  handleSubmit = () => {
    let AcceptError = false;
    const Accept = window.Accept;
    let secureData = {}, cardData = {}, authData = {};
    cardData.cardNumber = this.state.cardInfo.cardNumber;
    cardData.month = this.state.cardInfo.month.toString();
    cardData.year = this.state.cardInfo.year.toString().slice(-2);
    cardData.zip = this.state.billing_address.zip;
    cardData.cardCode = this.state.cardInfo.cardCode;
    authData.clientKey = process.env.AUTH_CLIENTKEY;
    authData.apiLoginID = process.env.AUTH_LOGINID;
    secureData.cardData = cardData;
    secureData.authData = authData;
    Accept.dispatchData(secureData, (response) => {
      if(response.messages.resultCode === 'Error') {
        for (var i = 0; i < response.messages.message.length; i++) {
          console.log(response.messages.message[i].code + ':' + response.messages.message[i].text);
        }
        console.log('acceptJS library error!');
        AcceptError = true;
        return;
      }
      this.setState({
        payment_token: response.opaqueData.dataValue
      })
    });
    if(!AcceptError) {
      const shippingRegion = states.find(x=>x.code === this.state.shipping_address.region_code);
      this.setState(prevState => ({
        shipping_address: {
          ...prevState.shipping_address,
          region: shippingRegion.name
        }
      }))
      const billingRegion = states.find(x => x.code === this.state.billing_address.region_code);
      this.setState(prevState => ({
        billing_address: {
          ...prevState.billing_address,
          region: billingRegion.name
        }
      }))
      const billingPhone = this.state.shipping_address.telephone
      this.setState(prevState => ({
        billing_address: {
          ...prevState.billing_address,
          telephone: billingPhone
        }
      }))
      const { shippingMethod, shippingInfo } = this.props;
      if (this.state.shipping_address.firstname === "" || this.state.shipping_address.lastname === ""
        || this.state.shipping_address.email === "") {
          return;
        }
      const shippingMethodData = {
        address: this.state.shipping_address
      }
      shippingMethod(shippingMethodData)
      .then((shippingMethodResponse) => {
        console.log(shippingMethodResponse);
        const shippingInfoData = {
          addressInformation: {
            shipping_address: this.state.shipping_address,
            "billing_address": this.state.billing_address,
            "shipping_carrier_code": shippingMethodResponse.payload[0].carrier_code,
            "shipping_method_code": shippingMethodResponse.payload[0].method_code
          }
        }
        shippingInfo(shippingInfoData)
        .then((shippingInfoResponse) => {
          console.log(shippingInfoResponse);
          this.setState({
            orderSummary: shippingInfoResponse.payload.totals.total_segments
          })
        })
      })
    }
  }

  handleBilling = (e) => {
    e.persist();
    const { value, name } = e.target;
    this.setState(prevState => ({
      billing_address: {
        ...prevState.billing_address,
        [name]: value
      }
    }))
  }

  handleShipping = (e) => {
    e.persist();
    const { value, name } = e.target;
    this.setState(prevState => ({
      shipping_address: {
        ...prevState.shipping_address,
        [name]: value
      }
    }))
  }

  handleCard = (e) => {
    e.persist();
    const { value, name } = e.target;
    this.setState(prevState => ({
      cardInfo: {
        ...prevState.cardInfo,
        [name]: value
      }
    }))
  }

  handleAddress = (e, method) => {
    e.persist();
    const { value, name } = e.target;
    if(method === "shipping") {
      this.setState(prevState => ({
        shipping_address: {
          ...prevState.shipping_address,
          [name]: [value]
        }
      }))
    } else {
      this.setState(prevState => ({
        billing_address: {
          ...prevState.billing_address,
          [name]: [value]
        }
      }))
    }
  }

  setDeliveryTime = () => {

  }

  placeOrder = () => {
    const { processTransaction } = this.props;
    const obj = {
      email: this.state.billing_address.email,
      paymentMethod: {
        method: "authorizenet_acceptjs",
        additional_data: {
          opaqueDataDescriptor: "COMMON.ACCEPT.INAPP.PAYMENT",
          opaqueDataValue: "eyJjb2RlIjoiNTBfMl8wNjAwMDUyOThDMDYzRUM2MEMxMDEyMjEwNjk1MjhDRkE0RjIyRUQ4QzIyM0NBQjc3NTQ2RDNFMDVGRTQyNjEwNjY5QzQxREZFMzlDRENGQzBFN0M1QzdFOTcyMzJFREM1RjFGNzJFIiwidG9rZW4iOiI5NTgwODUwMDM5MzA2NDczNTA0NjAxIiwidiI6IjEuMSJ9"
        }
      },
      billing_address: this.state.billing_address
    }
    processTransaction(obj)
    .then((response) => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { state } = this;
  
    const isWeekday = date => {
      const day = getDay(date);
      return day !== 6;
    };
    if(new Date() > setHours(setMinutes(new Date(), 0), 20)){
      const { startDate } = addDays(new Date(), 1);
    }
    return (
      <section className="checkout-area ptb-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="user-actions">
                <i className="fas fa-sign-in-alt"></i>
                <span>
                  Returning customer? <a href="#">Click here to login</a>
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="billing-details">
                <h3 className="title">Shipping Address</h3>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        className="form-control"
                        onChange={this.handleShipping}
                        value={state.shipping_address.firstname}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        onChange={this.handleShipping}
                        value={state.shipping_address.lastname}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Email <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={this.handleShipping}
                        value={state.shipping_address.email}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="telephone"
                        className="form-control"
                        onChange={this.handleShipping}
                        value={state.shipping_address.telephone}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>
                      <div className="select-box">
                        <select className="form-control" name="country" value={state.shipping_address.country_id}>
                          <option value="United state">US</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        State <span className="required">*</span>
                      </label>
                      <div className="select-box">
                        <select
                          className="form-control"
                          name="region_code"
                          onChange={this.handleShipping}
                          value={state.shipping_address.region_code}
                        >
                          { states.map(e =>
                            <option key={e.code} value={e.code}>{e.code}</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        onChange={this.handleShipping}
                        value={state.shipping_address.city}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Postcode / Zip <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        className="form-control"
                        onChange={this.handleShipping}
                        value={state.shipping_address.postcode}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="street"
                        className="form-control"
                        onChange={(e) => this.handleAddress(e, 'shipping')}
                        value={state.shipping_address.street[0]}
                      />
                    </div>
                  </div>

                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="create-an-account"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="create-an-account"
                      >
                        Create an account?
                      </label>
                    </div>
                  </div> */}

                  <div className="col-lg-12 col-md-6">
                    <h3 className="title">Delivery Details</h3>
                    <div className="form-group">
                      <label>
                        Delivery Time <span className="required">*</span>
                      </label>
                      <DatePicker
                        minDate={new Date()}
                        selected={this.state.startDate}
                        onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleChange} //only when value has changed
                        showTimeSelect
                        filterDate={isWeekday}
                        minTime={setHours(setMinutes(new Date(), 0), 8)}
                        maxTime={setHours(setMinutes(new Date(), 0), 20)}
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="date-picker"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="delivery-time"></div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="substitutions-sec">
                      <div className="radio-toolbar">
                        <input
                          type="radio"
                          id="radioCallMe"
                          name="radio-group2"
                        />
                        <label
                          data-event="click focus"
                          data-tip="We will call you before we replace a missing product"
                          htmlFor="radioCallMe"
                        >
                          Call me
                        </label>
                        <ReactTooltip place="bottom" />
                        <input
                          type="radio"
                          id="radioAllow"
                          name="radio-group2"
                          checked
                        />
                        <label
                          data-event="click focus"
                          data-tip="We will replace a missing product without contacting you"
                          htmlFor="radioAllow"
                        >
                          Allow
                        </label>

                        <input
                          type="radio"
                          id="radioDontAllow"
                          name="radio-group2"
                        />
                        <label
                          data-event="click focus"
                          data-tip="We will not replace a missing product"
                          htmlFor="radioDontAllow"
                        >
                          Don't allow
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="credit-card-form billing-details">
                <h3 className="title">Add Your Credit Card</h3>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Card Number <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        name="cardNumber"
                        className="form-control"
                        onChange={this.handleCard}
                        value={state.cardInfo.cardNumber}
                        placeholder="xxxx xxxx xxxx xxxx"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        CVV <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        name="cardCode"
                        className="form-control"
                        onChange={this.handleCard}
                        value={state.cardInfo.cardCode}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Month <span className="required">*</span>
                      </label>
                      <div className="select-box">
                        <select
                          className="form-control"
                          name="month"
                          onChange={this.handleCard}
                          value={state.cardInfo.month}
                        >
                          { months.map(e =>
                            <option key={e} value={e}>{e}</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Year <span className="required">*</span>
                      </label>
                      <div className="select-box">
                        <select
                          className="form-control"
                          name="year"
                          onChange={this.handleCard}
                          value={state.cardInfo.year}
                        >
                          { years.map(e =>
                            <option key={e} value={e}>{e}</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="billing-details">
                <h3 className="title">Billing Details</h3>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        className="form-control"
                        onChange={this.handleBilling}
                        value={state.billing_address.firstname}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        onChange={this.handleBilling}
                        value={state.billing_address.lastname}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Email <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={this.handleBilling}
                        value={state.billing_address.email}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="telephone"
                        className="form-control"
                        onChange={this.handleBilling}
                        value={state.billing_address.telephone}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>
                      <div className="select-box">
                        <select className="form-control" name="country" value={state.billing_address.country_id}>
                          <option value="United state">US</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        State <span className="required">*</span>
                      </label>
                      <div className="select-box">
                        <select
                          className="form-control"
                          name="region_code"
                          onChange={this.handleBilling}
                          value={state.billing_address.region_code}
                        >
                          { states.map(e =>
                            <option key={e.code} value={e.code}>{e.code}</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        onChange={this.handleBilling}
                        value={state.billing_address.city}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Postcode / Zip <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        className="form-control"
                        onChange={this.handleBilling}
                        value={state.billing_address.postcode}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="street"
                        className="form-control"
                        onChange={(e) => this.handleAddress(e, 'billing')}
                        value={state.billing_address.street[0]}
                      />
                    </div>
                  </div>

                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="ship-different-address"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="ship-different-address"
                      >
                        Set same as shipping address.
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button
                type="button"
                className={`btn btn-primary`}
                onClick={this.handleSubmit}
              >
                Submit
                </button>
            </div>
            <br />
            <div className="col-lg-12 col-md-12">
              <div className="order-details">
                <h3 className="title">Your Order</h3>

                <OrderSummary orderSummary={this.state.orderSummary} />

                <Payment placeOrder={this.placeOrder} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    total: state.cartReducer.total,
    shipping: state.cartReducer.shipping
  };
};

const mapDispatchToProps = dispatch => {
  return {
    shippingInfo: bindActionCreators(shippingInfo, dispatch),
    shippingMethod: bindActionCreators(shippingMethod, dispatch),
    processTransaction: bindActionCreators(processTransaction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
