function checkValidInput({ username, email }) {
  if (
    username == "" ||
    email == "" ||
    username == null ||
    email == null ||
    username == undefined ||
    email == undefined
  ) {
    return false;
  }
  return true;
}

module.exports = checkValidInput;
