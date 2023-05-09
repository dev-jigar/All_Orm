const Service = require("../helpers/index");
const send = Service.sendResponse;
const { HTTPStatus, ErrorCode } = require("../helpers/enum");
const { Message, Action } = require("../helpers/messages");
const Model = require("../models");
const { deleteUser } = require("../controllers/UserController");
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
        return { data: storeUser, token:token.token };
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
    const findUser = await users.findByPk(req.authUser.id);

    if (findUser) {
      const updatedUserData = await users.update(
        {
          name: data.name,
          userName: data.userName,
          country: data.country,
          dateOfBirth: data.dateOfBirth,
          bio: data.bio,
        },
        {
          where: {
            id: req.authUser.id,
          },
        }
      );
      if (!updateUser) {
        return send(
          res,
          HTTPStatus.BAD_REQUEST_STATUS_CODE,
          ErrorCode.REQUIRED_CODE,
          Message.DATA_NOT_SAVE,
          null
        );
      } else {
        return {
          data: {
            id: req.authUser.id,
          },
        };
      }
    }
  } catch (error) {
    console.log("updateUser===error", error);
    return send(
      res,
      HTTPStatus.INTERNAL_SERVER_CODE,
      HTTPStatus.INTERNAL_SERVER_CODE,
      Message.SOMETHING_WENT_WRONG,
      null
    );
  }
};
const DeleteUserDetails = async (id, req, res) => {
  try {
    const deleteUser = await users.destroy({
      where: {
        id: id,
      },
    });
    if (deleteUser === 1) {
      return { id: id };
    } else {
      return res.json({ error: "some thing went wrong" });
    }
  } catch (error) {
    console.log("Delete===error", error);
    return send(
      HTTPStatus.INTERNAL_SERVER_CODE,
      Message.SOMETHING_WENT_WRONG,
      null
    );
  }
};
module.exports = { getAllUsers, signUp, updateUser, DeleteUserDetails };

