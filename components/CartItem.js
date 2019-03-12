import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  const { item, quantity, id } = cartItem;

  if (!item) {
    return (
      <CartItemStyles>
        <p>This item has been removed.</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  }

  const { image, title, price } = item;

  return (
    <CartItemStyles>
      <img width="100" src={image} alt={title} />
      <div className="cart-item-details">
        <h3>{title}</h3>
        <p>
          {formatMoney(price * quantity)}
          {` - `}
          <em>
            {quantity} &times; {formatMoney(price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={id} />
    </CartItemStyles>
  );
};

export default CartItem;
