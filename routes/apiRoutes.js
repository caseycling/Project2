const db = require("../models");
const passport = require("../config/passport")
const express = require("express")

module.exports = function (app) {

  // Create a new user
  app.post("/api/new", function (req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // currentUser: true
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Login
  app.post("/api/login", passport.authenticate("local"), function (_req, res) {
    res.sendStatus(204)
  });

  // Logout
  app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });
}
