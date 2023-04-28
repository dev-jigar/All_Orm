const express = require("express");
const router = express.Router();
const  {feedTable, fetchData } = require("../controllers/mainController")
router.route('/').get(feedTable)
router.route('/fetch').get(fetchData)



module.exports = router 