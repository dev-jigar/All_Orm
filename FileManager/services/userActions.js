const Service = require("../helpers/index");
const send = Service.sendResponse;
const { HTTPStatus, ErrorCode } = require("../helpers/enum");
const { Message, Action } = require("../helpers/messages");
const Model = require("../models");
const localStorage = require("node-localstorage");


const users = Model.users;

const SaveUserRegistration = async (data, req, res) => {
  try {
    console.log(data);
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

        let storeUser = await users.create({
          FirstName: data.FirstName,
          LastName: data.LastName,
          email: data.email,
          UserName: data.UserName,
          password: HashedPassword,
          contact: data.contact,
        });

        if (!storeUser) {
          return send(
            res,
            HTTPStatus.BAD_REQUEST_STATUS_CODE,
            ErrorCode.REQUIRED_CODE,
            Message.DATA_NOT_SAVE
          );
        }

        const token = await Service.generateToken(storeUser.dataValues);
        
        return { data: storeUser, token: token };
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

module.exports = { SaveUserRegistration };
