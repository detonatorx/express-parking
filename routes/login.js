const router = require("express").Router();
const { sessionChecker } = require("../middleware/sessionConfig");
const User = require("../models/users");
const bcrypt = require("bcrypt");

router
  .route("/")
  .get(sessionChecker, (req, res) => {
    res.render("login");
  })

  .post(async (req, res) => {
    let { email, password } = req.body;
    // username = username.toLowerCase();

    const user = await User.findOne({ email });

    try {
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user.email;
        req.session.name = user.userName;
        console.log('name', req.session.name);

        res.redirect("/");
      } else {
        res.render("error", { error: "Неверный логин и/или пароль" });
      }
    } catch (err) {
      res.render('error', { error: err })
    }

  });


module.exports = router;
