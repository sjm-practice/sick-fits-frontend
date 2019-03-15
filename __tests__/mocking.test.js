/* eslint-disable func-names, no-unused-vars */

function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFoods = function() {
  return new Promise((resolve, reject) => {
    // simulate an API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe("mocking examples", () => {
  it("should mock a regular function", () => {
    const fetchWeather = jest.fn();
    fetchWeather();

    expect(fetchWeather).toHaveBeenCalled();
  });

  it("should create a Person", () => {
    const me = new Person("Steve", ["pizza", "lobster"]);
    expect(me.name).toBe("Steve");
  });

  it.skip("should fetch a person's foods", async () => {
    const me = new Person("Steve", ["pizza", "lobster"]);
    const foods = await me.fetchFoods();

    expect(foods).toContain("pizza");
  });

  it("should fetch a person's foods, with a mock", async () => {
    const me = new Person("Steve", ["pizza", "lobster"]);
    me.fetchFoods = jest.fn().mockResolvedValue(["sushi", "ramen"]);
    const foods = await me.fetchFoods();

    expect(foods).toContain("sushi");
  });
});
