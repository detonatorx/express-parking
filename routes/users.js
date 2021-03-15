const router = require('express').Router();
const { sessionVariables } = require('../middleware/sessionConfig');
const User = require("../models/users");

router.route('/')
  .get(sessionVariables, async (req, res) => {
    const listOfUsers = await User.find();
    // // console.log(listOfGosts);

    res.render('users', { listOfUsers });
  })

router.route('/:id')
  .get(sessionVariables, async (req, res) => {
    const { id } = req.params;
    const userr = await User.findOne({id});
    // // console.log(listOfGosts);
    console.log(userr);
    res.render('userEdit', { userr });
  })

  .put(sessionVariables, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    // id = id.substring(0, str.length - 1);
    console.log(id);
    
    try {
      const record = await Post.findOneAndUpdate({_id: id}, {
        $set: {
          userName: req.body.userName,
          deactivated: req.body.deactivated
        }
      });
      // res.json({status: 'update completed'});
      res.render('error', {error: "Данные изменены"});

    }

    catch (err) {
      res.status(404).json({ success: false, message: err.message })

    }
  })

  module.exports = router;
