const express = require("express");
const router = express.Router();
const { firstView,signup, register } = require("../controllers/indexController");
const { validateUser } = require("../middlewares/validation");


//all routes
router.get('/',firstView);
router.get('/sign-up',signup);
router.post('/sign-up',validateUser,register);

module.exports = router;
