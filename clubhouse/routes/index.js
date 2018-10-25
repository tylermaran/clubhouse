var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/club', { useNewUrlParser: true});
var Schema = mongoose.Schema;


var newClubSchema = new Schema({
  // here we can require a type and whether it is required
  clubName: {type: String, required: true},
  website: String,
  description: String,
  contact: String
});

var clubHouse = mongoose.model('ClubHouse', newClubSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ClubFinder' });
});

router.get('/search', function(req, res, next) {
  clubHouse.find().then(function(doc){
    res.render('search', {items: doc});
    console.log(doc);
    // res.json(doc);
  });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/myhomepage', function(req, res, next){
  res.render('myhomepage');
});


router.post('/create', function(req, res, next) {
  var item = {
    clubName: req.body.clubName,
    website: req.body.website,
    description: req.body.description,
    contact: req.body.contact
  };

  console.log(item);

  var data = new clubHouse(item);
  data.save();
  res.redirect('/myhomepage');

});

router.get('/admin', function(req, res, next) {
  res.render('admin');
});

module.exports = router;
