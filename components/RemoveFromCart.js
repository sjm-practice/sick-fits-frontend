import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  // This gets called as soon as we get a response back from
  // the server after a mutation has been performed.
  update = (cache, payload) => {
    // NOTE: this will get called twice. once immediately, using the value
    // in optimisticResponse for payload. then called a second time, when the
    // actual server response is received (which uses the actual payload value)

    // console.log("Running remove cart update...");
    // 1. read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // console.log(data);

    // 2. remove the item from the cache (use the cart item id returned
    //    in the server response)
    const removedCartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== removedCartItemId);

    // 3. write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id }}
        update={this.update}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: {
            __typename: "CartItem",
            id,
          },
        }}
      >
        {(removeFromCart, { loading }) => (
          <BigButton
            title="Delete Item"
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}
          >
            &times;
          </BigButton>
        )}
      </Mutation>
    );
  }
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
