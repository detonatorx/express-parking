const router = require('express').Router();
const { sessionVariables } = require('../middleware/sessionConfig');

router.route('/')
  .get(sessionVariables, (req, res) => {

    res.render('blank');
  })

module.exports = router;
