//var db = require("../models");
const passport = require('passport');
const bcrypt = require('bcrypt');
module.exports = function (app) {
  app.get('/', checkAuthenticated, (req, res) => {
    console.log("root");
    res.render('index', { name: req.user.name })
  })

  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
  })

  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
  })

  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      console.log("Register - POST");
      // const hashedPassword = await bcrypt.hash(req.body.password, 10)
      // console.log(req.body.name);
      // console.log(req.body.email);
      // console.log("Before hashed");
      // console.log(hashedPassword);
      // console.log("After hashed");
      // users.push({
      //   id: Date.now().toString(),
      //   name: req.body.name,
      //   email: req.body.email,
      //   password: hashedPassword
      // })
      res.redirect('/login')
    } catch(err) {
      console.log(err);
      res.redirect('/register')
    }
  })

  // app.delete('/logout', (req, res) => {
  //   req.logOut()
  //   res.redirect('/login')
  // })

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login');
  }
  //   res.redirect('/login')
  // }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


  // // Load index page
  // app.get("/", function(req, res) {
  //   res.send("home page");
  //   // db.Example.findAll({}).then(function(dbExamples) {
  //   //   res.render("index", {
  //   //     msg: "Welcome!",
  //   //     examples: dbExamples
  //   //   });
  //   // });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
