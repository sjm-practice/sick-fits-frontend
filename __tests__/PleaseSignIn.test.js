/* eslint-disable func-names */
import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeUser } from "../lib/testUtils";
import PleaseSignIn from "../components/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../components/User";

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

describe("<PleaseSignIn />", () => {
  it("should show a sign in dialog to logged out users", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignIn>
          <div id="pleasesignin-child" />
        </PleaseSignIn>
      </MockedProvider>,
    );

    // clear the Loading... message
    await wait();
    wrapper.update();

    expect(wrapper.text()).toContain("Please sign in before continuing...");
    expect(wrapper.find("Signin").exists()).toBe(true);
    expect(wrapper.find("#pleasesignin-child").exists()).toBe(false);
  });

  it("should render the child component when logged in", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignIn>
          <div id="pleasesignin-child" />
        </PleaseSignIn>
      </MockedProvider>,
    );

    // clear the Loading... message
    await wait();
    wrapper.update();

    expect(wrapper.find("Signin").exists()).toBe(false);
    expect(wrapper.find("#pleasesignin-child").exists()).toBe(true);
  });
});
