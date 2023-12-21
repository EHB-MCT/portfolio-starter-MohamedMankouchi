function checkValidInput({ username, email, createdBy }) {
  if (
    username == "" ||
    createdBy == "" ||
    email == "" ||
    username == null ||
    createdBy == null ||
    email == null ||
    username == undefined ||
    createdBy == undefined ||
    email == undefined
  ) {
    return false;
  }
  return true;
}

module.exports = checkValidInput;
