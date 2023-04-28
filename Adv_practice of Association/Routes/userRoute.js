const express = require("express");
const router = express.Router();
const {
  addUserMtd,
  addContext,
  HandleMnyRelationShip,
  showAllrecordsPoly,
  getScopeValue,
} = require("../Controllers/userController");

router.route("/").get(addUserMtd);
router.route("/add").get(HandleMnyRelationShip);
router.route("/polymorphic").get(addContext);
router.route("/polymorphic/record").get(showAllrecordsPoly);
router.route("/scope").get(getScopeValue);

module.exports = router;
