import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import Signup, { SIGNUP_MUTATION } from "../components/Signup";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser } from "../lib/testUtils";

function typeInput(wrapper, name, value) {
  wrapper.find(`input[name='${name}']`).simulate("change", { target: { name, value } });
}
const me = fakeUser();
const mocks = [
  // signup mutation mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: "test",
      },
    },
    result: {
      data: {
        signup: {
          __typename: "User",
          id: "abc123",
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // current user query mock
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: { me },
    },
  },
];

describe("<Signup />", () => {
  it("should render and match snapshot", async () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>,
    );
    const form = wrapper.find("form");
    expect(toJSON(form)).toMatchSnapshot();
  });

  it("should create user on submit and sign in that user", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>,
    );
    await wait();
    wrapper.update();

    typeInput(wrapper, "name", me.name);
    typeInput(wrapper, "email", me.email);
    typeInput(wrapper, "password", "test");
    wrapper.update();

    wrapper.simulate("submit");
    await wait(); // not always necessary, but ensures submit is completed before next lines

    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me);
  });
});
