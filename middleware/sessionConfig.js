const session = require('express-session');
const FileStore = require('session-file-store')(session);
const User = require("../models/users");


const cookieCleaner = (req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next()
};

module.exports.sessionConfig = (application) => {
  application.use(session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'anything here',
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 600000000
    }
  }));
  application.use(cookieCleaner);
};

module.exports.sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    next()
  }
};

module.exports.sessionVariables = async (req, res, next) => {
  if (req.session.user) {
    res.locals.login = true;
    res.locals.userLocal = req.session.user;
    res.locals.userName = req.session.name;

    const user = await User.findOne({ email: req.session.user });

    if (user.customer) {
      res.locals.customer = true;
    } else {
      res.locals.admin = true;
    }

    next()
  } else {
    next()
  }
};


