var express = require('express');
var router = express.Router();
var firebase = require('firebase');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('b59085633ba541a685595843a02c1bb8');


var news = {

  
  index: function(req,res,next){
    if(req.session.userId ){
      var context = {title: 'Lista de pedidos', email: req.session.email, idUser: req.session.userId, newsidenav: "active", nameUser: req.session.name, phoneUser: req.session.phone};
        newsapi.v2.topHeadlines({
          language: 'en',
          sortBy: 'relevancy' 
        }).then(response => {
          
          context.articlesResponse = response;
          context.articlesResponseJson = JSON.stringify(response);
          res.render("news/index", context);
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
  source: function(req,res,next){
    if(req.session.userId ){
      var source = req.params.source;
      var context = {title: 'Lista de pedidos', email: req.session.email, idUser: req.session.userId, nameSource:  source, nameUser: req.session.name, phoneUser: req.session.phone};
        newsapi.v2.topHeadlines({
          sources: source,
          language: 'en',
          sortBy: 'relevancy' 
        }).then(response => {
          
          context.articlesResponse = response;
          context.articlesResponseJson = JSON.stringify(response);
          res.render("news/index", context);
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

  search: function(req,res,next){
    console.log("---"+req.session.name+"----"+req.session.phone+"---"+ req.session.userId);
    if(req.session.userId ){
      console.log(req.body);
      var context = {title: 'Lista de pedidos', email: req.session.email, idUser: req.session.userId, nameUser: req.session.name, phoneUser: req.session.phone};
        newsapi.v2.topHeadlines({
          q: "pakistan",
          language: 'en',
          sortBy: 'relevancy' 
        }).then(response => {
          
          context.articlesResponse = response;
          context.articlesResponseJson = JSON.stringify(response);
          res.render("news/index", context);
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
router.get('/source/:source', news.source);
router.post('/search', news.search);

module.exports = router;
