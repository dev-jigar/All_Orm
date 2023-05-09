const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_EXPIRES_IN = "30d";
const { Message, Action } = require("../helpers/messages");
const moment = require("moment");
const Model = require("../models");
const users = Model.users;

module.exports = {
  sendResponse(res, status, code, message, payload) {
    return res.status(status).send(prepareResponse(code, message, payload));
  },
  bcryptPassword: async function (password) {
    var genSalt = await bcrypt.genSalt(10);
    var Password = await bcrypt.hash(password, genSalt);
    return Password;
  },
  generateToken: async function (user) {
    console.log("user_is", user);
    return generateJwt(
      {
        sub: user.id,
        action: Action.ACCESS,
      },
      ACCESS_TOKEN_EXPIRES_IN
    );
  },
  verifyJwt: async function (token) {
    try {
      let tokenData = jwt.verify(token, "HELLO Jigar");
      if (tokenData && this.getCurrentTimeStampUnix() > tokenData.exp) {
        return {
          isValid: false,
          reason: "expired",
        };
      } else if (tokenData && this.getCurrentTimeStampUnix() < tokenData.exp) {
        return {
          isValid: true,
          ...tokenData,
        };
      } else {
        return {
          isValid: false,
          reason: "expired",
        };
      }
    } catch (error) {
      return {
        isValid: false,
        reason: "expired",
      };
    }
  },
  getCurrentTimeStampUnix: function () {
    return moment().unix();
  },
  getUserById:async function (userId) {
    return await users.findByPk(userId)
  }
};

function prepareResponse(status, message, data) {
  if (data != null || data != undefined) {
    return {
      responseCode: status,
      responseMessage: message,
      responseData: data,
    };
  }
  return {
    responseCode: status,
    responseMessage: message,
  };
}

async function generateJwt(payload) {
  let token = jwt.sign(payload, "HELLO Jigar", {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    algorithm: "HS256",
  });
  return token;
}
