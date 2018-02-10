const process = require("process");

module.exports = (req, res, next) => {
    if (req.isAuthenticated() || process.env.BYPASS_AUTH === "true") {
        return next();
    }
    console.warn("401 -", req.method, req.originalUrl);
    res.send(401);
};
