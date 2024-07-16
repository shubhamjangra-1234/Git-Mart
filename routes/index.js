var express = require("express");
var app = express();
var router = express.Router();
const userModel = require("./users");
const OrderModel = require("./order");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("home");
});
router.get("/Men", async function (req, res, next) {
  res.render("Men");
});
router.get("/Women", function (req, res, next) {
  res.render("women");
});
router.get("/Fashion", function (req, res, next) {
  res.render("Fashion");
});
router.get("/Watch", function (req, res, next) {
  res.render("Watches");
});
router.get("/Shoes", function (req, res, next) {
  res.render("shoes");
});
router.get("/camera", function (req, res, next) {
  res.render("camera");
});
router.get("/Buds", function (req, res, next) {
  res.render("Buds");
});
router.get("/Login", function (req, res, next) {
  res.render("Login");
});
router.get("/Signup", function (req, res, next) {
  res.render("Signup");
});
router.get("/Order", function (req, res, next) {
  res.render("order");
});
//register route
router.post("/register", function (req, res) {
  var userData = new userModel({
    email: req.body.email,
    fullName: req.body.fullName,
    username: req.body.username,
    password: req.body.password,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
});
//Order route
router.post("/getOrder", async function (req, res) {
  await OrderModel.create({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    address: req.body.address,
    product: req.body.product,
    quantity: req.body.quantity,
    query: req.body.query,
  });
  res.redirect("/");
});
//code for login
router.post(
  "/Login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/Login",
    failureFlash: true,
  }),
  function (req, res) {}
);
// code for logout

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/Login");
  });
});
//code for isLoggedIn Middleware

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
module.exports = router;
