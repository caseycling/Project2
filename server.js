require("dotenv").config();
var flash = require("connect-flash");
var cookieParser = require("cookie-parser")
var session = require("express-session")
var passport = require("passport");
var express = require("express");
var exphbs = require("express-handlebars");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(cookieParser("keyboard cat"));
app.use(passport.initialize());
app.use(session({ 
  cookie: { maxAge: 60000 },
  secret: "keyboard cat" 
}));
app.use(flash());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/upload-api-routes")(app);
require("./routes/apiRoutes")(app);
require("./routes/trade-api-routes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
