const router = require('express').Router();
const { sessionVariables } = require('../middleware/sessionConfig');

router.route('/')
  .get(sessionVariables, async (req, res) => {

    res.render('about');
  })
module.exports = router;
