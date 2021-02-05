const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = () =>{
 const app = express();

 app.use(bodyParser.urlencoded({ extended : true}));
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(express.static('public'))

 return app
}


