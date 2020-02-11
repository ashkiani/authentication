var express = require("express");
const Database = require("./lib/database");
const db = new Database("users_db");
var path = require("path");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Root get route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/login.html"));
});

// Post route -> back to home
app.post("/login", function (req, res) {
    //req.body...
    console.log(req.body);
    res.send("response");
    //res.redirect("/");
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
