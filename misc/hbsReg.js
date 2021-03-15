const hbs = require('hbs');
const path = require('path');

module.exports.partialsReg = () => {
    hbs.registerPartials(path.join(__dirname,'../views/partials'));
}
