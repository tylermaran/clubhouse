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

router.get('/search/:location?', function(req, res, next) {
  clubHouse.find().then(function(doc){
    var location = req.params.location;
    console.log(location);
    res.render('search', {layout: 'searchLayout.hbs'});
    // console.log(doc);
    // res.json(doc);
  });
});

// Api route to return full database entry for search
router.get('/api', function(req, res, next) {
  clubHouse.find().then(function(doc){
    res.json(doc);
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {layout: 'mainpage.hbs'});
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
  res.render('admin', {layout: 'adminLayout.hbs'});
});

module.exports = router;
