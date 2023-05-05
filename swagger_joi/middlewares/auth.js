const { HTTPStatus, ErrorCode } = require("../helpers/enum");
const Service = require("../helpers/index");
const { Message } = require("../helpers/messages");
const send = Service.sendResponse;

module.exports = {
  authenticateUser: async function (req, res, next) {
    try {
      // console.log(req.headers);
      var headerToken = req.headers.authorization;

      var accessToken = headerToken.replace("Bearer ", " ").trim();
      console.log(accessToken);
      if (accessToken == undefined) {
        return send(
          res,
          HTTPStatus.BAD_REQUEST_STATUS_CODE,
          ErrorCode.REQUIRED_CODE,
          Message.TOKEN_REQUIRED,
          null
        );
      }
      const token = await Service.verifyJwt(accessToken);
      if (!token.isValid) {
        return send(
          res,
          HTTPStatus.UNAUTHORIZED_CODE,
          ErrorCode.INVALID_CODE,
          Message.TOKEN_INVALID,
          null
        );
      }

      const user = await Service.getUserById(token.sub);
      if (!user) {
        return send(
          res,
          HTTPStatus.UNAUTHORIZED_CODE,
          ErrorCode.INVALID_CODE,
          Message.TOKEN_INVALID,
          null
        );
      }

      req.authUser = user;
      return next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
