/* eslint-disable func-names */
import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import Router from "next/router";
import Pagination, { PAGINATION_QUERY } from "../components/Pagination";

// essentially, mocking the router here (stubbing out push and prefetch calls)
// per Wes, this technique is pointed out in the next documentation, but I didn't
// find it there.  I did find something similar...
// https://gist.github.com/novascreen/f1c44ead31e5a494556793be2c408840

Router.router = {
  push() {},
  prefetch() {},
};

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: "aggregate",
            aggregate: {
              __typename: "count",
              count: length,
            },
          },
        },
      },
    },
  ];
}

describe("<Pagination />", () => {
  it("should display a Loading... message", () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>,
    );

    expect(wrapper.text()).toContain("Loading...");
  });

  it("should renders pagination for 18 items", async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>,
    );

    // clear the Loading... message
    await wait();
    wrapper.update();

    const totalPages = wrapper.find(".totalPages");
    expect(totalPages.text()).toBe("5");

    const pagination = wrapper.find("div[data-test='pagination']");
    expect(toJSON(pagination)).toMatchSnapshot();
  });

  it("should disable prev button on first page", async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>,
    );

    // clear the Loading... message
    await wait();
    wrapper.update();
    expect(wrapper.find("a.prev").prop("aria-disabled")).toBe(true);
    expect(wrapper.find("a.next").prop("aria-disabled")).toBe(false);
  });
  it("should disable next button on last page", async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={5} />
      </MockedProvider>,
    );

    // clear the Loading... message
    await wait();
    wrapper.update();
    expect(wrapper.find("a.prev").prop("aria-disabled")).toBe(false);
    expect(wrapper.find("a.next").prop("aria-disabled")).toBe(true);
  });
  it("should enable prev and next buttons on a middle page", async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={3} />
      </MockedProvider>,
    );

    // clear the Loading... message
    await wait();
    wrapper.update();
    expect(wrapper.find("a.prev").prop("aria-disabled")).toBe(false);
    expect(wrapper.find("a.next").prop("aria-disabled")).toBe(false);
  });
});
