const { getAllUsers, signUp, updateUser } = require("../repository/UserRepo");
const { HTTPStatus, ErrorCode } = require("../helpers/enum");
const { Message, Action } = require("../helpers/messages");
const Service = require("../helpers/index");
const send = Service.sendResponse;

const getUser = async (req, res) => {
  try {
    const data = await getAllUsers();
    res.json({ data: data });
  } catch (error) {
    console.log("getUser error: " + error);
    return res.json({
      HttpStatusCode: HTTPStatus.INTERNAL_SERVER_CODE,
      Message: Message.SOMETHING_WENT_WRONG,
    });
  }
};
const addUser = async (req, res) => {
  try {
    const register = await signUp(req.body, req, res);
    res.json({ data: register?.data, token: register.token });
  } catch (error) {
    console.log("signUp error: " + error);
  }
};
const uptUser = async (req, res) => {
  try {
    const updatedUserData = await updateUser(req.body, req, res);
    res.json({ data: updatedUserData });
  } catch (error) {
    console.log("UpdateUser error: " + error);
  }
};
const deleteUser = async (req, res) => {};

module.exports = {
  getUser,
  addUser,
  uptUser,
  deleteUser,
};
