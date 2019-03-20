import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import Router from "next/router";
import NProgress from "nprogress";
import { MockedProvider } from "react-apollo/test-utils";
import TakeMyMoney from "../components/TakeMyMoney";
import { fakeUser, fakeCartItem } from "../lib/testUtils";
import { CURRENT_USER_QUERY } from "../components/User";

Router.router = { push() {} };

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()],
        },
      },
    },
  },
];

describe("<TakeMyMoney />", () => {
  it("should render and match snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney>
          <div />
        </TakeMyMoney>
      </MockedProvider>,
    );
    await wait();
    wrapper.update();

    expect(toJSON(wrapper.find("ReactStripeCheckout"))).toMatchSnapshot();
  });

  it("should create an order onToken", async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: {
        createOrder: {
          id: "xyz789",
        },
      },
    });

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney>
          <div />
        </TakeMyMoney>
      </MockedProvider>,
    );
    const component = wrapper.find("TakeMyMoney").instance();
    // manually call that onToken method
    component.onToken({ id: "abc123" }, createOrderMock);
    expect(createOrderMock).toHaveBeenCalledWith({ variables: { token: "abc123" } });
  });

  it("should start NProgress progress bar", async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: {
        createOrder: {
          id: "xyz789",
        },
      },
    });

    NProgress.start = jest.fn();

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney>
          <div />
        </TakeMyMoney>
      </MockedProvider>,
    );
    await wait();
    wrapper.update();

    const component = wrapper.find("TakeMyMoney").instance();
    // manually call that onToken method
    component.onToken({ id: "abc123" }, createOrderMock);
    expect(NProgress.start).toHaveBeenCalledWith();
  });

  it("should route to the order page when completed", async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: {
        createOrder: {
          id: "xyz789",
        },
      },
    });

    Router.router.push = jest.fn();

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney>
          <div />
        </TakeMyMoney>
      </MockedProvider>,
    );
    await wait();
    wrapper.update();

    const component = wrapper.find("TakeMyMoney").instance();
    // manually call that onToken method
    component.onToken({ id: "abc123" }, createOrderMock);
    await wait();
    wrapper.update();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/order",
      query: { id: "xyz789" },
    });
  });
});
