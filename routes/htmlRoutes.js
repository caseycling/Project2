var db = require("../models");

var Op = db.Sequelize.Op;
module.exports = function (app) {
  app.get("/", function (req, res) {
      res.render("index")
  });

  // Load market page
  app.get("/market", function (req, res) {
    db.Upload.destroy({
      where: {
        createdAt: { [Op.lt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }
      }
    }).then(function () {
      db.Upload.findAll({
        include: [db.Image]
      }).then(function (dbUpload) {
        res.render("market", { Upload: dbUpload });
      });

    });
  });

  // load uploading page
  app.get('/upload', function (req, res) {
    res.render("upload");
    // find everything by that user 
  });

  // load trading page
  app.get('/trades', function (req, res) {
    res.render("trades");
  });

  // load about page
  app.get('/about', function (req, res) {
    res.render("about");
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
