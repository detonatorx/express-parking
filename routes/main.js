const router = require('express').Router();
const { sessionVariables } = require('../middleware/sessionConfig');
const Space = require("../models/space");

router.route('/')
  .get(sessionVariables, async (req, res) => {
    const listOfSpaces = await Space.find();
    // console.log(listOfGosts);

    res.render('main', { listOfSpaces });
  })
module.exports = router;
