var express = require("express");
var authMiddleware = require("../auth/middleware");

var router = express.Router();

const get = (req, res) => {
    res.json(req.user);
};

router.route("/").get(authMiddleware, get);

module.exports = router;
