const router = require('express').Router();
const { sessionVariables } = require('../middleware/sessionConfig');
const Space = require("../models/space");

router.route('/')
  .get(sessionVariables, async (req, res) => {
    const listOfSpaces = await Space.find();
    res.render('spaces', { listOfSpaces });
  })

router.route('/new')
  .get(sessionVariables, (req, res) => {
    res.render('newSpace');
    // res.send('OK')
  })

  .post(sessionVariables, async (req, res) => {
    const { number, pass, info, price } = req.body;
    try {

      const newSpace = new Space({
        number,
        pass,
        info,
        price,
      });

      await newSpace.save()

      res.render('error', { error: "Парковочное место создано" })


    } catch (err) {
      res.status(404).json({ success: false, message: err.message })
    }
  })

router.route('/free')
  .get(sessionVariables, async (req, res) => {
    const listOfSpaces = await Space.find({occupied: false, active: true, booked: false});
    res.render('free', { listOfSpaces });
  })


router.route('/:id')
  .get(sessionVariables, async (req, res) => {
    const { id } = req.params;
    const item = await (await Space.findById(id))//.populate('customer', 'userName');
    res.render('spaceEdit', { item });
  })

  .put(sessionVariables, async (req, res) => {
    const { id } = req.params;

    try {
      const record = await Space.findOneAndUpdate({ _id: id }, {
        $set: {
          number: req.body.number,
          pass: req.body.pass,
          info: req.body.info,
          price: req.body.price,
          booked: req.body.booked,
          occupied: req.body.occupied,
          active: req.body.active,
        }
      });
      res.json({ mes: 'Изменения записаны' });

    } catch (err) {
      res.json({ mes: 'Ошибка записи', error: err.message });

    }
  })

router.route('/book/:id')
// .get(sessionVariables, async (req, res) => {
  //   const { id } = req.params;
  //   const item = await (await Space.findById(id))//.populate('customer', 'userName');
  //   res.render('spaceEdit', { item });
  // })
  
  .put(sessionVariables, async (req, res) => {
    const { id } = req.params;
    
    const item = await Space.findOne({_id:id});
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>',item);
    
    if (item.booked) {
      res.json({ mes: 'Место уже забронировано'});
    } else {
      try {
        const record = await Space.findOneAndUpdate({ _id: id }, {
          $set: {
            booked: req.body.booked
          }
        });
        res.json({ mes: 'Успешно забронировано' });
  
      } catch (err) {
        res.json({ mes: 'Ошибка записи', error: err.message });
      }
    }

    
  })

module.exports = router;
