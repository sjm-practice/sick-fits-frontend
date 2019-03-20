/* eslint-disable func-names */
import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeItem } from "../lib/testUtils";
import SingleItem, { SINGLE_ITEM_QUERY } from "../components/SingleItem";

describe("<SingleItem />", () => {
  it("should render with proper data", async () => {
    const mocks = [
      {
        // when someone makes a request with this query and variable combo
        request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
        // return this fake data
        result: {
          data: {
            item: fakeItem(),
          },
        },
      },
    ];

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>,
    );

    expect(wrapper.text()).toContain("Loading...");
    await wait(); // allows javascript to execute, so Loading will go away
    wrapper.update();

    // console.log(wrapper.debug());
    // you can snapshot certain pieces, so you don't have to include MockedProvider
    expect(toJSON(wrapper.find("h2"))).toMatchSnapshot();
    expect(toJSON(wrapper.find("img"))).toMatchSnapshot();
    expect(toJSON(wrapper.find("p"))).toMatchSnapshot();
  });

  it("should render with an error when item not found", async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
        result: {
          errors: [{ message: "Item Not Found" }],
        },
      },
    ];

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>,
    );

    expect(wrapper.text()).toContain("Loading...");
    await wait(); // allows javascript to execute, so Loading will go away
    wrapper.update(); // let the component update (clear Loading...)

    const item = wrapper.find("[data-test]");
    // console.log(item.debug());
    expect(item.text()).toContain("Item Not Found");
  });
});
