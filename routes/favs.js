var express = require('express');
var router = express.Router();
var firebase = require('firebase');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('b59085633ba541a685595843a02c1bb8');


var news = {

  
  index: function(req,res,next){
    if(req.session.userId ){
      var context = {title: 'Lista de pedidos', email: req.session.email, idUser: req.session.userId, favsidenar: "active", nameUser: req.session.name, phoneUser: req.session.phone};
        newsapi.v2.topHeadlines({
          language: 'en',
          sortBy: 'relevancy' 
        }).then(response => {
          console.log("------------")
          console.log(response);
          console.log("------------")
          context.articlesResponse = response;
          context.articlesResponseJson = JSON.stringify(response);
          res.render("favs/index", context);
          /*
            {
              status: "ok",
              articles: [...]
            }
          */
        });
    }else{
      res.redirect('/');
    }
    
        
  },
  
  
  

}


router.get('/', news.index);


module.exports = router;
