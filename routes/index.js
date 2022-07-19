const router = require("express").Router();
const isLoggedIn = require('../middlewares')

/* GET home page */
router.get("/", isLoggedIn,(req, res, next) => {
  res.render("index");
});

module.exports = router;
