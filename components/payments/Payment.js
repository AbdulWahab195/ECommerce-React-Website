import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetCart } from "../../store/actions/cartActions";

class Payments extends React.Component {
  handleClick = () => {
    this.props.resetCart();
    toast.success("Order has been confirmed", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });

    setTimeout(function() {
      Router.push("/thankyou");
    }, 3000);
  };
  render() {
    const { placeOrder } = this.props;
    return (
      <React.Fragment>
        <ToastContainer transition={Zoom} />

        <div className="order-btn">
          <button
            onClick={placeOrder}
            className={`btn btn-primary w-100 ${
              this.props.disabled ? "btn-disabled" : ""
            }`}
          >
            Place Order
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetCart: () => {
      dispatch(resetCart());
    }
  };
};

export default connect(null, mapDispatchToProps)(Payments);
