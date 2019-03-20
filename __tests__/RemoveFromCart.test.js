import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import RemoveFromCart, { REMOVE_FROM_CART_MUTATION } from "../components/RemoveFromCart";
import { fakeUser, fakeCartItem } from "../lib/testUtils";
import { CURRENT_USER_QUERY } from "../components/User";

// overwriting alert, because there is no alert in the test environment
global.alert = console.log;

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: "abc123" })],
        },
      },
    },
  },
  // note, a second query is not needed here (like it was in the AddToCart test)
  // because RemoveFromCart directly updates the cache and doesn't rely on a follow up
  // query to get the user's updated cart
  {
    request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: "abc123" } },
    result: {
      data: {
        removeFromCart: {
          __typename: "CartItem",
          id: "abc123",
        },
      },
    },
  },
];

describe("<RemoveFromCart />", () => {
  it("should render and match snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RemoveFromCart id="abc123" />
      </MockedProvider>,
    );
    // not sure why wait and wrapper.update is not needed here

    expect(toJSON(wrapper.find("button"))).toMatchSnapshot();
  });

  it("should remove an item from cart when clicked", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <RemoveFromCart id="abc123" />;
          }}
        </ApolloConsumer>
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    const {
      data: { me },
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });

    expect(me.cart).toHaveLength(1);

    // remove an item from the cart
    wrapper.find("button").simulate("click");
    await wait(100); // weird. For some reason, needed to increase wait here.

    // check an item was added
    const {
      data: { me: me2 },
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me2.cart).toHaveLength(0);
  });
});
