var express = require("express");
var _ = require("lodash");
var Guid = require("guid");
var router = express.Router();
var authMiddleware = require("../auth/middleware");
var ModelProperty = require("../schema/property");
var ModelMedia = require("../schema/media");

const getAll = (req, res) => {
    ModelProperty.find((error, properties) => {
        _.forEach(properties, (p, i) => {
            delete properties[i]._doc.body;
        });
        res.json(properties);
    });
};

const getAllVisible = (req, res) => {
    ModelProperty.find((error, properties) => {
        _.forEach(properties, (p, i) => {
            delete properties[i]._doc.body;
        });
        res.json(_.filter(properties, { visible: true }));
    });
};

const create = (req, res) => {
    var property = new ModelProperty(
        Object.assign({}, req.body, {
            _id: Guid.raw(),
            safeName: req.body.name
                .toLowerCase()
                .split(" ")
                .join("-")
        })
    );
    property.save(error => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(property);
    });
};

const getById = (req, res) => {
    ModelProperty.findOne()
        .or([{ _id: req.params.id }, { safeName: req.params.id }])
        .exec((error, property) => {
            if (error) {
                res.status(500).send(error);
                return;
            }

            if (property) {
                res.json(property);
            } else {
                res.sendStatus(404);
            }
        });
};

const deleteById = (req, res) => {
    ModelProperty.findOneAndRemove({ _id: req.params.id }, error => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.sendStatus(204);
    });
};

const updateById = (req, res) => {
    ModelProperty.findOne({ _id: req.params.id }, (error, property) => {
        if (error) {
            res.status(500).send(error);
            return;
        }

        if (property) {
            const {
                name,
                description,
                locationRefId,
                body,
                visible
            } = req.body;
            _.merge(property, {
                name,
                description,
                locationRefId,
                body,
                visible
            });
            property.save(error => {
                if (error) {
                    res.status(500).send(error);
                    return;
                }
                res.status(200).send(property);
            });
        } else {
            res.sendStatus(404);
        }
    });
};

const getMediaByPropertyId = (req, res) => {
    ModelProperty.findOne()
        .or([{ _id: req.params.id }, { safeName: req.params.id }])
        .exec((error, property) => {
            if (error) {
                res.status(500).send(error);
                return;
            }

            if (property) {
                ModelMedia.find(
                    { propertyRefId: property._doc._id },
                    (_error, media) => {
                        res.json(media); // media is an array
                    }
                );
            } else {
                res.sendStatus(404);
            }
        });
};

router.route("/").get(getAll);
router.route("/").post(authMiddleware, create);
router.route("/visible").get(getAllVisible);
router.route("/:id").get(getById);
router.route("/:id").delete(authMiddleware, deleteById);
router.route("/:id").put(authMiddleware, updateById);
router.route("/:id/media").get(getMediaByPropertyId);

module.exports = router;
