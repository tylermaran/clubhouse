var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true});
var Schema = mongoose.Schema;


var userDataSchema = new Schema({
  // here we can require a type and whether it is required
  title: {type: String, required: true},
  content: String,
  author: String
}, {collection: 'user-data'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express/Handlebars/Mongoose' });
});



module.exports = router;
