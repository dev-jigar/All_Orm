const express = require("express");
const router = express.Router();
const {
  getUser,
  addUser,
  uptUser,
  deleteUser,
} = require("../controllers/UserController");
const { validateUser } = require("../middlewares/validation");
const { authenticateUser } = require("../middlewares/auth");

router.route("/").get(getUser);
router.post("/add", validateUser, addUser);
router.put("/update/:id",authenticateUser,uptUser);
router.delete("/delete/:id",authenticateUser,deleteUser);

module.exports = router;
