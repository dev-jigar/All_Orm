const Service = require("../helpers/index");
const send = Service.sendResponse;
const { HTTPStatus, ErrorCode } = require("../helpers/enum");
const { Message, Action } = require("../helpers/messages");
const Model = require("../models");
const users = Model.users;

//to get all users
const getAllUsers = async () => {
  return await users.findAll({});
};

//signUp user
const signUp = async (data, req, res) => {
  try {
    // console.log(data);
    if (data.email) {
      let checkEmail = await users.findOne({ where: { email: data.email } });
      if (checkEmail != null) {
        return send(
          res,
          HTTPStatus.UNAUTHORIZED_CODE,
          ErrorCode.INVALID_CODE,
          Message.USER_ALLREADY_REGISTER,
          null
        );
      } else {
        const HashedPassword = await Service.bcryptPassword(data.password);

        const storeUser = await users.create({
          name: data.name,
          email: data.email,
          password: HashedPassword,
          userName: data.userName,
          country: data.country,
          dateOfBirth: data.dateOfBirth,
          bio: data.bio,
        });

        if (!storeUser) {
          return send(
            res,
            HTTPStatus.BAD_REQUEST_STATUS_CODE,
            ErrorCode.REQUIRED_CODE,
            Message.DATA_NOT_SAVE
          );
        }
        console.log("User Created", storeUser);

        var token = {
          token: await Service.generateToken(storeUser.dataValues),
        };
        return { data: storeUser, token };
      }
    }
  } catch (error) {
    console.log("signUp===error", error);
    return send(
      HTTPStatus.INTERNAL_SERVER_CODE,
      Message.SOMETHING_WENT_WRONG,
      null
    );
  }
};
const updateUser = async (data, req, res) => {
  try {
    
  } catch (error) {
    console.log("updateUser===error", error);
    return send(
      HTTPStatus.INTERNAL_SERVER_CODE,
      Message.SOMETHING_WENT_WRONG,
      null
    );
  }
};
module.exports = { getAllUsers, signUp, updateUser };
