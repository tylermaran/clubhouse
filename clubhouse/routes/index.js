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

var survey = new Schema({
  clubName: {
    type: String,
    required: true
  },
  knownFor: Array,
  golf: Boolean,
  tennis: Boolean,
  swimming: Boolean,
  allowPublicGolf: Boolean,
  golfOnlyMemberships: Boolean,
  discountMemberships: Boolean,
  discountAge: Number
})

var clubHouse = mongoose.model('ClubHouse', newClubSchema);
var clubDetail = mongoose.model('clubDetail', clubDetailSchema);


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ClubFinder'
  });
});

// search route
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

// route for edit page
router.get('/edit/:id?', function (req, res, next) {
  let club = req.params.id;
  console.log(club);

  clubDetail.findOne({
    clubName: club
  }).then(function (doc) {
    console.log('success getting club');
    
    res.render('adminEdit', {
      title: club,
      layout: 'adminEditLayout.hbs',
      content: doc
    });
  });
})

// Find one and delete
router.post('/api/delete/:id', function (req, res, next) {
  let club = req.params.id;
  console.log('deleting ' + club);

  clubDetail.findOneAndDelete({
    clubName: club
  }).then(function () {
    clubHouse.findOneAndDelete({
      clubName: club
    }).then(function (doc) {
      console.log(doc);
      res.json(doc);
    });
  });
});

// Register route
router.get('/register', function (req, res, next) {
  res.render('register', {
    title: 'Register',
    layout: 'registerLayout.hbs'
  });
});

// My Homepage route
router.get('/myhomepage', function (req, res, next) {
  res.render('myhomepage');
});

// Survey Route
router.get('/survey', function (req, res, next) {
  res.render('survey', {
    title: 'Survey',
    layout: 'surveyLayout.hbs'
  });
});

// Create new club
router.post('/create/:id?', function (req, res, next) {
  let id = req.params.id;

  if (req.body.description.length > 150) {
    var brief = (req.body.description).substring(0, 150) + '...';
  } else {
    var brief = (req.body.description);
  }

  let overview = {
    clubName: req.body.clubName,
    website: req.body.website,
    description: brief,
    contact: req.body.contact
  };

  let detail = {
    clubName: req.body.clubName,
    website: req.body.website,
    description: req.body.description,
    contact: req.body.contact,
    reviews: req.body.reviews,
    images: req.body.images
  }

  const overviewDB = new clubHouse(overview);
  overviewDB.save();

  const detailDB = new clubDetail(detail)
  detailDB.save();

  res.redirect('/' + id);
});

// Render admin page
router.get('/admin', function (req, res, next) {
  res.render('admin', {
    layout: 'adminLayout.hbs'
  });
});

// Module.exports - this doesn't even need a label
module.exports = router;