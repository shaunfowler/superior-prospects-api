var express = require("express");
var router = express.Router();

router.route("/").get((req, res) => {
    res.json(req.user);
});

module.exports = router;
