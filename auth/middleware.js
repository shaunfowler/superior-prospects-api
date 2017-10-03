module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.warn("401 -", req.method, req.originalUrl);
    res.send(401);
};
