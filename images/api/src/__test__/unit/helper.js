function checkValidInput({ username, password }) {
  if (
    username == "" ||
    password == "" ||
    username == null ||
    password == null ||
    username == undefined ||
    password == undefined
  ) {
    return false;
  }
  return true;
}

module.exports = checkValidInput;
