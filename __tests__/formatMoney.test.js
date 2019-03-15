import formatMoney from "../lib/formatMoney";

describe("formatMoney", () => {
  it("should format zero with no cents", () => {
    expect(formatMoney(0)).toEqual("$0");
  });

  it("should format fractional amounts (cents)", () => {
    expect(formatMoney(1)).toEqual("$0.01");
    expect(formatMoney(10)).toEqual("$0.10");
    expect(formatMoney(99)).toEqual("$0.99");
  });

  it("should leave cents off for whole dollars", () => {
    expect(formatMoney(100)).toEqual("$1");
    expect(formatMoney(1000)).toEqual("$10");
    expect(formatMoney(9900)).toEqual("$99");
    expect(formatMoney(990000)).toEqual("$9,900");
  });

  it("should format dollars and cents", () => {
    expect(formatMoney(110)).toEqual("$1.10");
    expect(formatMoney(1005)).toEqual("$10.05");
    expect(formatMoney(9904)).toEqual("$99.04");
    expect(formatMoney(990001)).toEqual("$9,900.01");
  });
});
