var express = require("express");
var Guid = require("guid");
var router = express.Router();
var authMiddleware = require("../auth/middleware");
var Model = require("../schema/update");

const getAll = (req, res) => {
    Model.find((error, properties) => {
        res.json(properties);
    });
};

const create = (req, res) => {
    var update = new Model(
        Object.assign({}, req.body, {
            _id: Guid.raw(),
            crated: new Date().toISOString()
        })
    );
    update.save(error => {
        if (error) {
            res.json({ error: error });
            return;
        }
        res.json(update);
    });
};

const getById = (req, res) => {
    Model.find({ _id: req.params.id }, (error, update) => {
        if (error) {
            res.json(error);
            return;
        }

        if (update) {
            res.json(update);
        } else {
            res.json({ info: "not found" });
        }
    });
};

const deleteById = (req, res) => {
    Model.findOneAndRemove({ _id: req.params.id }, error => {
        if (error) {
            res.json({ error: error });
            return;
        }
        res.json({ info: "removed" });
    });
};

router.route("/").get(getAll);
router.route("/").post(authMiddleware, create);
router.route("/:id").get(getById);
router.route("/:id").delete(authMiddleware, deleteById);

module.exports = router;
