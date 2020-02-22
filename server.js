if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
var db = require("./models");
const express = require('express');
var exphbs = require("express-handlebars");
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  async function (email) {
    console.log("Finding user by email.");
    let v1 = await db.User.findOne({ where: { username: email } });
    console.log(v1);
    return v1;
  },
  async function (id) {
    console.log("Finding user by id.");
    let v1 = await db.User.findOne({ where: { id: id } });
    console.log(v1);
    return v1;
  }
);
//email => users.find(user => user.email === email)
//const users = []

var PORT = process.env.PORT || 3000;


app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
// Middleware
// app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
//db.sequelize.sync(syncOptions).then(function() {
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});




// app.listen(PORT, function () {
//   console.log(
//     "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//     PORT,
//     PORT
//   );
// });

module.exports = app;
