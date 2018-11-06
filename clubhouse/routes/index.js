var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/club', {
  useNewUrlParser: true
});
var Schema = mongoose.Schema;


var newClubSchema = new Schema({
  // here we can require a type and whether it is required
  clubName: {
    type: String,
    required: true
  },
  website: String,
  description: String,
  contact: String
});

var clubDetailSchema = new Schema({
  // here we can require a type and whether it is required
  clubName: {
    type: String,
    required: true
  },
  website: String,
  description: String,
  contact: String,
  reviews: String,
  images: String
});


var clubHouse = mongoose.model('ClubHouse', newClubSchema);
var clubDetail = mongoose.model('clubDetail', clubDetailSchema);


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ClubFinder'
  });
});

router.get('/search/:id?', function (req, res, next) {
  clubHouse.find().then(function (doc) {
    var location = req.params.id;
    console.log(location);
    res.render('search', {
      layout: 'searchLayout.hbs'
    });

  });
});

// Api route to return full database entry for search
router.get('/api', function (req, res, next) {
  clubHouse.find().then(function (doc) {
    res.json(doc);
  });
});

// Api route to return full database entry for search
router.get('/api/:id', function (req, res, next) {
  let club = req.params.id;
  console.log(club);
  clubDetail.findOne({
    clubName: club
  }).then(function (doc) {
    res.json(doc);
  });
});

// Api route to return full database entry for search
router.post('/api/delete/:id', function (req, res, next) {
  let club = req.params.id;
  console.log('deleting ' + club);
  console.log(typeof(club));
  clubDetail.findOneAndDelete({
    clubName: club
  }).then(function (doc) {
    console.log(doc);
  });
  clubHouse.findOneAndDelete({
    clubName: club
  }).then(function (doc) {
    console.log(doc);
  });
  
});

// Takes 
router.get('/register', function (req, res, next) {
  res.render('register', {
    layout: 'registerLayout.hbs'
  });
});

router.get('/myhomepage', function (req, res, next) {
  res.render('myhomepage');
});


router.post('/create', function (req, res, next) {

  var brief = (req.body.description).substring(0, 150) + '...';


  var overview = {
    clubName: req.body.clubName,
    website: req.body.website,
    description: brief,
    contact: req.body.contact
  };

  var detail = {
    clubName: req.body.clubName,
    website: req.body.website,
    description: req.body.description,
    contact: req.body.contact,
    reviews: req.body.reviews,
    images: req.body.images
  }

  var overviewDB = new clubHouse(overview);
  overviewDB.save();

  var detailDB = new clubDetail(detail)
  detailDB.save();

  res.redirect('/myhomepage');

});

router.get('/admin', function (req, res, next) {
  res.render('admin', {
    layout: 'adminLayout.hbs'
  });
});

module.exports = router;