const express = require("express");
const { addCombo, updateCombo, showData } = require("../controllers/ComboController");
const router = express.Router();


router.route("/addcombo").post(addCombo);
router.route("/uptcombo").put(updateCombo);
router.route("/getData").get(showData);



module.exports = router;
