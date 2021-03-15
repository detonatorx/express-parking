const mainRouter = require('../routes/main');
const signupRouter = require('../routes/signup');
const loginRouter = require('../routes/login');
const logoutRouter = require('../routes/logout');
const spaceRouter = require('../routes/space');
const usersRouter = require('../routes/users');
const contactRouter = require('../routes/contacts');
const emptyRouter = require('../routes/blank');

module.exports.routersConfig = (application) => {
  application.use('/', mainRouter);
  application.use('/signup', signupRouter);
  application.use('/login', loginRouter);
  application.use('/logout', logoutRouter);
  application.use('/spaces', spaceRouter);
  application.use('/users', usersRouter);
  application.use('/contacts', contactRouter);
  application.use('/about', emptyRouter);
  application.use('/prices', emptyRouter);
};
