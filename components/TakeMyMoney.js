import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import NProgress from "nprogress";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import StripeCheckout from "react-stripe-checkout";
import User, { CURRENT_USER_QUERY } from "./User";
import calcTotalPrice from "../lib/calcTotalPrice";

export const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, { quantity }) => tally + quantity, 0);
}

class TakeMyMoney extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start();

    // manually call the mutation once we have the stripe token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => alert(err.message));

    Router.push({
      pathname: "/order",
      query: { id: order.data.createOrder.id },
    });
  };

  render() {
    const { children } = this.props;

    return (
      <User>
        {({ data: { me }, loading }) => {
          if (loading) return null;
          const { cart } = me;
          const image =
            cart.length && cart[0].item && cart[0].item.image ? cart[0].item.image : "";

          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrder => (
                <StripeCheckout
                  amount={calcTotalPrice(cart)}
                  name="Sick Fits"
                  description={`Order of ${totalItems(cart)} items!`}
                  image={image}
                  stripeKey="pk_test_XmebB427QkON6HMeQq3lAn49"
                  currency="USD"
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                >
                  {children}
                </StripeCheckout>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

TakeMyMoney.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TakeMyMoney;
