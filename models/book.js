const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = mongoose.model('book', {

    items: {
      type: Schema.Types.ObjectId,
      ref: 'spaces'
    },
    booked: Boolean,
    occupied: Boolean,
    date: Date
});
