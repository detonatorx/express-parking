const mongoose = require('mongoose');

module.exports.dbConnect = () => {
    mongoose.connect('mongodb://localhost/parkingDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};
