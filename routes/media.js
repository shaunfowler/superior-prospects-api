var express = require("express");
var router = express.Router();
var authMiddleware = require("../auth/middleware");
var ModelMedia = require("../schema/media");

const getAll = (req, res) => {
    ModelMedia.find((error, properties) => {
        res.json(properties);
    });
};

const create = (req, res) => {
    res.sendStatus(200);
};

const getById = (req, res) => {
    ModelMedia.findOne({ _id: req.params.id }, (error, media) => {
        if (error) {
            res.status(500).send(error);
            return;
        }

        if (media) {
            res.json(media);
        } else {
            res.sendStatus(404);
        }
    });
};

const deleteById = (req, res) => {
    ModelMedia.findOneAndRemove({ _id: req.params.id }, error => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.sendStatus(204);
    });
};

router.route("/").get(getAll);
router.route("/").post(create);
router.route("/:id").get(getById);
router.route("/:id").delete(authMiddleware, deleteById);

module.exports = router;
