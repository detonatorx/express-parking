const router = require("express").Router();
const User = require("../models/users");
const { sessionChecker } = require("../middleware/sessionConfig");
const { sessionVariables } = require('../middleware/sessionConfig');
const bcrypt = require("bcrypt");
const salt = 10;

router
  .route("/")
  .get(sessionChecker, (req, res) => {
    res.render("signup");
  })
  .post(sessionVariables, async (req, res) => {
      let { email, password, userName, customer } = req.body;
      // console.log(email);
      email = email.toLowerCase();

      const check = await User.findOne({ email });
      if (!check) {
        const user = new User({
          email,
          password: await bcrypt.hash(password, salt),
          userName,
          customer,
          deactivated: false
        });
        await user.save();

        req.session.username = user.username;
        // res.render("signup", { mes: 'User created' });
        res.render("error", { error: "Вы успешно зарегистрировались" });

      } else {
        res.render("error", { error: "Такой пользователь уже существует" });
      }
    }
  );

module.exports = router;
