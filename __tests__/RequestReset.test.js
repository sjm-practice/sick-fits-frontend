import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import Router from "next/router";
import RequestReset, { REQUEST_RESET_MUTATION } from "../components/RequestReset";

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: "test@test.com" },
    },
    result: {
      data: { requestReset: { message: "success", __typename: "Message" } },
    },
  },
];

describe("<ResetRequest />", () => {
  it("should render and match snapshot", () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>,
    );
    expect(toJSON(wrapper.find("form[data-test='form']"))).toMatchSnapshot();
  });

  it("should call the request reset mutation", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>,
    );
    // simluting typing in an email address
    wrapper
      .find("input")
      .simulate("change", { target: { name: "email", value: "test@test.com" } });

    // submit the form
    wrapper.find("form").simulate("submit");
    await wait();
    wrapper.update();

    expect(wrapper.find("p").text()).toContain(
      "Success! Check your email for a reset link.",
    );
  });
});
