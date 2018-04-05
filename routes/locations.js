var express = require("express");
var _ = require("lodash");
var Guid = require("guid");
var router = express.Router();
var authMiddleware = require("../auth/middleware");
var ModelLocation = require("../schema/location");

const getAll = (req, res) => {
    ModelLocation.find((error, locations) => {
        res.json(locations);
    });
};

const create = (req, res) => {
    var location = new ModelLocation(req.body);
    location._id = Guid.raw();
    location.safeName = location.name
        .toLowerCase()
        .split(" ")
        .join("-");
    location.save(error => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(location);
    });
};

const getById = (req, res) => {
    ModelLocation.findOne()
        .or([{ _id: req.params.id }, { safeName: req.params.id }])
        .exec((error, location) => {
            if (error) {
                res.status(500).send(error);
                return;
            }

            if (location) {
                res.json(location);
            } else {
                res.sendStatus(404);
            }
        });
};

const deleteById = (req, res) => {
    ModelLocation.findOneAndRemove({ _id: req.params.id }, error => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.sendStatus(204);
    });
};

const updateById = (req, res) => {
    ModelLocation.findOne({ _id: req.params.id }, (error, location) => {
        if (error) {
            res.status(500).send(error);
            return;
        }

        if (location) {
            _.merge(location, req.body);
            location.save(error => {
                if (error) {
                    res.status(500).send(error);
                    return;
                }
                res.json(location);
            });
        } else {
            res.sendStatus(404);
        }
    });
};

router.route("/").get(getAll);
router.route("/").post(authMiddleware, create);
router.route("/:id").get(getById);
router.route("/:id").delete(authMiddleware, deleteById);
router.route("/:id").put(authMiddleware, updateById);

module.exports = router;
