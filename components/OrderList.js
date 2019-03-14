import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import { format } from "date-fns";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders {
      id
      total
      createdAt
    }
  }
`;

class OrderList extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;

          const { orders } = data;

          return (
            <div>
              <ul>
                {orders.map(order => (
                  <li key={order.id}>
                    <span>
                      <Link
                        href={{
                          pathname: "/order",
                          query: { id: order.id },
                        }}
                      >
                        <a>{order.id}</a>
                      </Link>
                    </span>
                    {" - "}
                    <span>{formatMoney(order.total)}</span>
                    {" - "}
                    <span>{format(order.createdAt, "MMMM d, YYYY h:mm a")}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OrderList;
