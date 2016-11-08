var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/',  function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/pin', function(req, res){
  User.find({}, 'pins', function(error, users) {
    var pins = [];
    for(var i = 0; i < users.length; i++){
        for(var j = 0; j < users[i].pins.length; j++){
            pins.push({url: users[i].pins[j].url, title: users[i].pins[j].title});
        }
    }
    res.json(pins);
  });
});

router.post('/pin', function(req, res){
   var reqBody = req.body,
      pin = {title: reqBody.title, url: reqBody.url};
      console.log(reqBody.user);
      
  User.findOne({'local.email':reqBody.user}, function(error, user) {
      
      user.pins.push(pin);
      console.log(user);
      user.save(function(err, doc) {
        if(err || !doc) {
          throw 'Error';
        } else {
          res.json(doc);
        }   
      });
  });
});

router.get('/pin/:user', function(req, res){
  User.findOne({'local.email': req.params.user}, 'pins', function(error, pins) {
    res.json(pins.pins);
  });
});

module.exports = router;
