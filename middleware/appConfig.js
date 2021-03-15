const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
// const override = require('method-override');

module.exports.appConfig = (application) => {
    application.set('view engine', 'hbs');
   
    application.use(morgan('dev'));
    application.use(cookieParser());
    // application.use(override('_method'));
    
    application.use(express.static('public'));
    // app.use(express.static(__dirname + '/dist/css'));
    
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());
};
