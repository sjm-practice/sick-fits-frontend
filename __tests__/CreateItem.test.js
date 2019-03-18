import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import Router from "next/router";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import CreateItem, { CREATE_ITEM_MUTATION } from "../components/CreateItem";

const dogImage = "https://dogs.com/dog.jpg";

// mock global fetch api
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }],
  }),
});

describe("<CreateItem />", () => {
  it("should render and match snapshot", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    );

    expect(toJSON(wrapper.find("form[data-test='form']"))).toMatchSnapshot();
  });
});
