/* eslint-disable func-names, no-unused-vars */
import React from "react";
import { shallow } from "enzyme";
import Item from "../components/Item";

const fakeItem = {
  id: "abc123",
  title: "A cool item",
  price: 5000,
  description: "a cool item yeah",
  image: "item.jpg",
  largeImage: "largeItem.jpg",
};

describe("<Item />", () => {
  it("should render and display correctly", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const PriceTag = wrapper.find("PriceTag");
    // to render one level lower, when using shallow, use dive
    expect(PriceTag.dive().text()).toBe("$50");

    const img = wrapper.find("img");
    // console.log(img.debug());
    // console.log(img.props());
    expect(img.props().src).toBe(fakeItem.image);
  });
});
