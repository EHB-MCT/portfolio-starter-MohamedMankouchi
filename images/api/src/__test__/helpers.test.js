const checkValidInput = require("./unit/helper");

describe("Checking if the sent inputs are valid", () => {
  test("Checking name and password", () => {
    expect(checkValidInput({ username: "", password: "" })).toBe(false);
    expect(checkValidInput({ username: "Mohamed", password: "" })).toBe(false);
    expect(checkValidInput({ username: "", password: "Mohamed123" })).toBe(
      false
    );
    expect(checkValidInput({ username: null, password: null })).toBe(false);
    expect(checkValidInput({ username: undefined, password: undefined })).toBe(
      false
    );
    expect(
      checkValidInput({ username: "Mohamed", password: "Mohamed123" })
    ).toBe(true);
  });
});
