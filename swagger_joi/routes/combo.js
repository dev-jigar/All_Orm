const express = require("express");
const { addCombo, updateCombo, showData } = require("../controllers/ComboController");
const { validateCombo, validateuptCombo } = require("../middlewares/validateCombo");
const router = express.Router();


router.post("/addcombo",validateCombo,addCombo);
router.put('/uptcombo',validateuptCombo,updateCombo);
router.route("/getData").get(showData);



module.exports = router;

