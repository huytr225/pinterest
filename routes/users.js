var express = require('express');
var passport=require('passport');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function(req,res,next){
  res.render('login.ejs',{message:req.flash('loginMessage')});
});

router.get('/signup',function(req,res){
  res.render('signup.ejs',{message:req.flash('loginMessage')});
});

router.get('/profile',isLoggedIn,function(req,res){
  res.render('profile.ejs',{user:req.user});
});

router.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
})


router.post('/signup', function(req, res, next){
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.json( { message: info.message }) }
      res.json(user);
    })(req, res, next);   
});

router.post('/login', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.json( { message: info.message }) }
      res.json(user);
    })(req, res, next);   
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/users/profile',
  failureRedirect: '/',
}));



module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    login = true;
    return next();
  }

  res.redirect('/');
}
