// Routes


var db = require("../models");

module.exports = function (app) {
<<<<<<< HEAD
    // Get all available items
    app.get("/trades", function (req, res) {
        db.Upload.findAll({
            where: { available: true }
        }).then(function (item) {
            res.json(item);
            // res.render()
=======
    // Get all available items for particular user
    app.get("/trades", function (req, res) {
        db.Upload.findAll({
            include :[db.Image]
        }).then(function (dbUpload) {
            // res.json(item);
            res.render("trades", { Upload: dbUpload });
>>>>>>> 9cdee9028adafcd2658ed23400204674adc08460
        });
    });
    var requested;

    app.post("/api/trade/:id", function (req, res) {
        db.Upload.update({
            requested: true,
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function () {
                res.redirect("/trades");
            });
    });

    // Update availability status
    app.post("/api/availability/:id", function (req, res) {
        db.Upload.update({
            available: false,
            requested:false
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function () {
                res.redirect("/market");
            })
    });
}
