const Guid = require("guid");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
var express = require("express");
var router = express.Router();
var authMiddleware = require("../auth/middleware");
var ModelMedia = require("../schema/media");

const uploadDir = path.join(__dirname, "/../uploads");

const getAll = (req, res) => {
    ModelMedia.find((error, properties) => {
        res.json(properties);
    });
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
    ModelMedia.findOneAndRemove({ _id: req.params.id }, (error, doc) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        const filepath = path.join(uploadDir, doc.fileName);
        fs.unlink(filepath, error => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Deleting media item '${filepath}'`);
            }
        });
        res.sendStatus(204);
    });
};

const create = (req, res) => {
    console.log(
        `Uploading file ${req.file.originalName} for property ${
            req.params.propertyId
        }`
    );

    const { propertyId } = req.params;
    const { originalname, size, mimetype } = req.file;
    var media = new ModelMedia({
        _id: Guid.raw(),
        fileName: originalname,
        fileSize: size,
        propertyRefId: propertyId,
        type: mimetype,
        created: new Date().toISOString()
    });
    media.save();

    res.json(media);
};

// File upload middleware
const uploadMiddleware = multer({
    limits: {
        fileSize: 50 * 1024 * 1024 // 50 MB
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    fileFilter: function(req, file, cb) {
        var filetypes = /jpeg|jpg|png|pdf|officedocument|openxmlformats|xlsx|docx/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(`File upload only supports the following filetypes - ${filetypes}`);
    }
});

router.route("/").get(getAll);
router.route("/").post(create);
router.route("/:id").get(getById);
router.route("/:id").delete(authMiddleware, deleteById);
router.route("/:propertyId").post(uploadMiddleware.single("media"), create);

module.exports = router;
