const express = require("express");
const router = express.Router();
const { firstView,signup, register, Home } = require("../controllers/indexController");
const { validateUser } = require("../middlewares/validation");
const { authenticateUser } = require("../middlewares/auth");


//all routes
router.get('/',firstView);
router.get('/sign-up',signup);
router.post('/sign-up',validateUser,register);
// router.get("/user/:id", getUserData);
router.get('/home',Home);

module.exports = router;
