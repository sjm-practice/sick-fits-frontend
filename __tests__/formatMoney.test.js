import formatMoney from "../lib/formatMoney";

describe("formatMoney", () => {
  it("should add a dollar sign", () => {
    expect(formatMoney(1)).toEqual("$0.01");
  });
});
