const router = require('express').Router();
const { sessionVariables } = require('../middleware/sessionConfig');
const Item = require("../models/item");
const User = require("../models/users");
const Buy = require("../models/buy");

router.route('/')
  .get(sessionVariables, async (req, res) => {
    // console.log(res.locals.userLocal);
    // const listOfPosts = await Post.find();
    // console.log(listOfPosts);

    res.render('item');
  })

  .post(sessionVariables, async (req, res) => {
    let { number, title, info, price, quantity } = req.body;
    title = title.toLowerCase();

    const check = await Item.findOne({ number });
    if (!check) {
      const item = new Item({
        number,
        title,
        info,
        price,
        quantity,
      });
      await item.save();

      res.redirect("/");
    } else {
      res.render("error", { error: "Артикул внесен ранее" });
    }
  })

router.route('/:id')
  .put(sessionVariables, async (req, res) => {
    const { id } = req.params;
    const { itemToBuy } = req.body;

    const itemToFind = await Item.findOne({ _id: id });
    const userToFind = await User.findOne({ email: req.session.user });
    // console.log(userToFind);

    let arr = [...userToFind.basket]
    arr.push(itemToFind);
    // console.log(arr);

    let quantityNew = itemToFind.quantity - itemToBuy;


    if (itemToFind.quantity > itemToBuy) {
      await User.findOneAndUpdate({ email: req.session.user }, {
        $set: {
          basket: arr
        }
      })

      await Item.findOneAndUpdate({ _id: id }, {
        $set: {
          quantity: quantityNew
        }
      });

      const newBuy = new Buy({
        customer: userToFind._id,
        items: itemToFind
      });

      await newBuy.save()

      res.json({ mes: `Заказано ${itemToBuy} шт.` });

    } else if (itemToFind.quantity == itemToBuy) {
      await User.findOneAndUpdate({ email: req.session.user }, {
        $set: {
          basket: arr
        }
      })

      await Item.findOneAndUpdate({ _id: id }, {
        $set: {
          quantity: 0
        }
      });

      const newBuy = new Buy({
        customer: userToFind._id,
        items: itemToFind
      });

      await newBuy.save()

      res.json({ mes: `Заказано ${itemToBuy} шт., доступно для заказа 0 шт.` });
    } else {
      res.json({ mes: `Нельзя заказать ${itemToBuy} шт., недостаточно позиций на складе!` });
    }

  });

module.exports = router;
