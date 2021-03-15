const mongoose = require('mongoose');
const Schema = mongoose.Schema;



module.exports = mongoose.model('space', Schema({
    number: String,
    pass: Boolean,
    info: String,
    price: Number,
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      default: null
    },
    booked: {
      type: Boolean,
      default: false
    },
    occupied: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    }
    // photo: String,
    // quantity: Number
}));
