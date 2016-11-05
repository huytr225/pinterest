var express = require('express');
var passport=require('passport');

var router = express.Router();
login=false;
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

router.post('/signup',passport.authenticate('local-signup',{
  successRedirect:'/users/profile',
  failureRedirect:'/users/signup',
  failureFlash:true,
}));

router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/users/profile',
  failureRedirect: '/users/login',
  failureFlash: true,
}))

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/users/profile',
  failureRedirect: '/',
}));



module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    login=true;
    return next();
  }

  res.redirect('/');
}
