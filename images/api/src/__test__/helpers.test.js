const checkValidInput = require("./unit/helper");

describe("Checking if the sent inputs are valid", () => {
  test("Checking name and email", () => {
    expect(checkValidInput({ username: "", email: "" })).toBe(false);
    expect(checkValidInput({ username: "Mohamed", email: "" })).toBe(false);
    expect(checkValidInput({ username: "", email: "Mohamed123" })).toBe(false);
    expect(
      checkValidInput({ username: null, email: null, createdBy: null })
    ).toBe(false);
    expect(
      checkValidInput({
        username: undefined,
        email: undefined,
        createdBy: undefined,
      })
    ).toBe(false);
    expect(
      checkValidInput({
        username: "Mohamed",
        email: "Mohamed123",
        createdBy: "Admin",
      })
    ).toBe(true);
  });
});
