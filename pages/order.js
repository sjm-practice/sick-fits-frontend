import React from "react";
import PleaseSignIn from "../components/PleaseSignIn";
import Order from "../components/Order";

const OrderPage = ({ query: { id: orderId } }) => (
  <div>
    <PleaseSignIn>
      <Order id={orderId} />
    </PleaseSignIn>
  </div>
);

export default OrderPage;
