const express = require("express");
const { addCombo, updateCombo, showData } = require("../controllers/ComboController");
const { validateCombo } = require("../middlewares/validateCombo");
const router = express.Router();


router.post("/addcombo",validateCombo,addCombo);
router.route("/uptcombo").put(updateCombo);
router.route("/getData").get(showData);



module.exports = router;
