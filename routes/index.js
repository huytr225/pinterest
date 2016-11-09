var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/',  function(req, res, next) {
  res.sendFile('index.html');
});

// router.get('/pin', function(req, res){
  
//   User.find({}, function(error, users) {
//     var pins = [];
//     for(var i = 0; i < users.length; i++){
//         for(var j = 0; j < users[i].pins.length; j++){
//             pins.push({url: users[i].pins[j].url, title: users[i].pins[j].title, user: users[i].local.email});
//         }
//     }
//     res.json(pins);
//   });
// });

router.post('/pin', function(req, res){
   var reqBody = req.body,
      pin = {title: reqBody.title, url: reqBody.url};
      
  User.findOne({'local.email':reqBody.user}, function(error, user) {
      
      user.pins.push(pin);
      user.save(function(err, doc) {
        if(err || !doc) {
          throw 'Error';
        } else {
          res.json(doc);
        }   
      });
  });
});

router.get('/pin/:me/:user', function(req, res){
  var user = req.params.user;
  var me   = req.params.me;
  var pins = [];
  if(user == "all"){
    User.find({}, function(error, users) {
      for(var i = 0; i < users.length; i++){
          for(var j = 0; j < users[i].pins.length; j++){
            var isLike = false;
            for(var k = 0; k <  users[i].pins[j].like.length; k++){
              if(users[i].pins[j].like[k].email == me) {isLike =true; break;};
            }
            pins.push({
              url: users[i].pins[j].url, 
              title: users[i].pins[j].title, 
              user: users[i].local.email, 
              numLike: users[i].pins[j].like.length,
              isLike: isLike
            });
          }
      }
      res.json(pins);
    });
  } else {
    User.findOne({'local.email': req.params.user}, 'pins', function(error, doc) {
      doc = doc.pins;
      for(var i = 0; i < doc.length; i++){
        var isLike = false;
        for(var j = 0, numLike = doc[i].like.length; j <  numLike; j++){
          if(doc[i].like[j].email == me) {isLike =true; break;};
        }
        pins.push({
          url: doc[i].url,
          title: doc[i].title,
          numLike: numLike,
          isLike: isLike
        });
      }
      res.json(pins);
    });
  }
  
});

router.post('/remove', function(req, res){
   
   User.update( 
      { 'local.email':req.body.user },
      { $pull: { pins : { title : req.body.title } } },
      { safe: true },
      function(err, doc) {
        if(err) throw err;
        res.json("success");
      });
      
});
router.post('/like', function(req, res){
     User.findOne({'local.email':req.body.user}, function(error, user) {
      if(user != null){
        for(var i = 0; i < user.pins.length; i++)
          if(user.pins[i].title == req.body.title)
            user.pins[i].like.push({email: req.body.me});
          
        user.save(function(err, doc) {
          if(err || !doc) {
            throw 'Error';
          } else {
            res.json(doc);
          }   
        });
      }
  });
});

router.post('/unlike', function(req, res){
      User.findOne({
        'local.email':req.body.user,
        'pins.title' : req.body.title/*,
        'pins.like.email': req.body.me*/
      }, function(error, doc) {
        if(error || !doc) {console.log("Error"); res.json("Error");}
        else{
        var pins = doc.pins;
        for(var i = 0; i < pins.length; i++ ){
          if(pins[i].title == req.body.title){
            for(var j = 0; j < pins[i].like.length; j++){
              if(pins[i].like[j].email == req.body.me)
                pins[i].like.splice(j,1);
            }
            break;
          }
        }
        doc.save(function(err, doc) {
        if(err || !doc) {
          console.log ('Error');
        } else {
          res.json(doc);
        }   
        });
        }
    });
      
});


module.exports = router;
