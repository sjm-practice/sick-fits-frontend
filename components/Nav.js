import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";

const Nav = () => (
  <NavStyles>
    <User>{({ data: { me } }) => (me ? <p>{me.name}</p> : null)}</User>
    <Link href="/items">
      <a>Shop</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>
  </NavStyles>
);

export default Nav;
