import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import Router from "next/router";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import CreateItem, { CREATE_ITEM_MUTATION } from "../components/CreateItem";
import { fakeItem } from "../lib/testUtils";

const dogImage = "https://dogs.com/dog.jpg";

// mock global fetch api
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }],
  }),
});

describe("<CreateItem />", () => {
  afterAll(() => global.fetch.mockReset());

  it("should render and match snapshot", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    );

    expect(toJSON(wrapper.find("form[data-test='form']"))).toMatchSnapshot();
  });

  it("should upload a file when file input changes", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    );

    const input = wrapper.find("input[type='file']");
    input.simulate("change", { target: { files: ["dogimage.jpg"] } });
    await wait();

    // check the state of the component instance
    const component = wrapper.find("CreateItem").instance();
    expect(component.state.image).toBe(dogImage);
    expect(component.state.largeImage).toBe(dogImage);
    expect(global.fetch).toHaveBeenCalled();
  });

  it("should save form values in state", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    );

    wrapper
      .find("#title")
      .simulate("change", { target: { name: "title", value: "Title" } });
    wrapper
      .find("#price")
      .simulate("change", { target: { name: "price", value: 500, type: "number" } });
    wrapper
      .find("#description")
      .simulate("change", { target: { name: "description", value: "Description" } });

    await wait();

    expect(wrapper.find("CreateItem").instance().state).toMatchObject({
      title: "Title",
      price: 500,
      description: "Description",
    });
  });

  it("should create an item when the form is submitted", async () => {
    const item = fakeItem();
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            price: item.price,
            description: item.description,
            image: "",
            largeImage: "",
          },
        },
        result: {
          data: {
            createItem: {
              ...item,
              __typeName: "Item",
            },
          },
        },
      },
    ];

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>,
    );

    // simulate user filling out the form
    wrapper
      .find("#title")
      .simulate("change", { target: { name: "title", value: item.title } });
    wrapper.find("#price").simulate("change", {
      target: { name: "price", value: item.price, type: "number" },
    });
    wrapper
      .find("#description")
      .simulate("change", { target: { name: "description", value: item.description } });

    // mock the router
    Router.router = { push: jest.fn() };

    wrapper.find("form").simulate("submit");
    await wait(50);

    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/item",
      query: { id: item.id },
    });
  });
});
