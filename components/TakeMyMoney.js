import React, { Component } from "react";
import PropTypes from "prop-types";
import StripeCheckout from "react-stripe-checkout";
import User from "./User";
import calcTotalPrice from "../lib/calcTotalPrice";

function totalItems(cart) {
  return cart.reduce((tally, { quantity }) => tally + quantity, 0);
}

class TakeMyMoney extends Component {
  onToken = res => {
    console.log("On Token:");
    console.log(res.id);
  };

  render() {
    const { children } = this.props;

    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Sick Fits"
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_XmebB427QkON6HMeQq3lAn49"
            currency="USD"
            email={me.email}
            token={res => this.onToken(res)}
          >
            {children}
          </StripeCheckout>
        )}
      </User>
    );
  }
}

TakeMyMoney.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TakeMyMoney;
