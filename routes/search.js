var express = require('express');
var router = express.Router();
// This is Dr. Water's API
// TODO: Put this API key to config
var rotten = require('rotten-tomatoes-api')('yedukp76ffytfuy24zsqk7f5');
var util = require('util');

router.get('/search/:keyword', function (req, res) {
  var query = req.params.keyword;
  return rotten.movieSearch({ q: query, page_limit: 20 }, function(err, val) {
    var loggedInfo = req.user ? req.user.username : "";
    if (err) {
      return res.status('400').render('error', {
        username: loggedInfo
        , csrfToken: req.csrfToken()
        , message: err
      });
    }
    return res.render('search', {
      username: loggedInfo
      , csrfToken: req.csrfToken()
      , movies: val.movies
    });
  });
});

module.exports = router;

