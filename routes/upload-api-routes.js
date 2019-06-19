// Final upload api routes!
// Requiring our models
var db = require("../models");

// cloudinary and multer
var multer = require("multer");
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_ID,
    api_secret: process.env.API_SECRET
})

var cloudinaryStorage = require("multer-storage-cloudinary");

var storage = cloudinaryStorage({ cloudinary: cloudinary, folder: "demo", allowedFormats: ["jpg", "png"], transformation: [{ width: 500, height: 500, crop: "limit" }] });
var parser = multer({ storage: storage });


module.exports = function (app) {
    app.get("/upload", function (req, res) {
        db.Upload.findAll({
            // where userId  is my id
            include: [db.Image]
        }).then(function (dbUpload) {
            // res.json(dbUpload);
            res.render("upload", { Upload: dbUpload });
        });

    });

    // upload product
    app.post("/api/upload", function (req, res) {
        db.Upload.create({
            product_name: req.body.product_name,
            description: req.body.description,
            condition: req.body.condition,
            contact: req.body.contact
        }).then(function () {
            db.Upload.count({}).then(function (db) {
                res.json(db);
            });
        });
    });


// upload image
app.post('/api/images', parser.single("image"), function (req, res) {
    var result = cloudinary.v2.uploader.upload(req.file.path)
    db.Image.create({
        url: req.file.secure_url
    }).then(function (newImage) {
        // connect Image table with Upload table
        db.Upload.update({
            ImageId: newImage.id
        }, {
                where: {
                    id: newImage.id
                },
                include: [db.Image]

            }).then(function () {
                res.redirect("/market");
            });

    });
});

};