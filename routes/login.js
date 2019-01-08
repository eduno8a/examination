var express = require('express');
var router = express.Router();
var firebase = require('firebase');



var loginindex = {

  
  index: function(req,res,next){
    var context = {title: 'Lista de pedidos'};
        
        res.render("login/index", context);
  },
  login: function(req,res,next){
    console.log(req.body.name+"****"+req.body.phone);
    
    req.session.name = req.body.name;
    req.session.phone = req.body.phone;
    req.session.email = req.body.email;
    req.session.userId = req.body.idUser;
    console.log("---"+req.session.name+"----"+req.session.phone+"---"+ req.session.userId)
    res.send(true);

  },
  logout: function(req, res, next){
    req.session.user = null;
    res.redirect('/');
  },
  

}


router.get('/', loginindex.index);
router.post('/login', loginindex.login);
router.get('/logout', loginindex.logout);

module.exports = router;
