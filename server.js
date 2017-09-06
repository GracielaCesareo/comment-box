var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments.js');
// var mongo = require('mongodb');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 8080;
// var mongoURI = 'mongodb://localhost:27017/myCommentList'

// var mongodb = mongoose.connect(mongoURI).connection;
// mongodb.on('error', function(err){console.log(err.message);});
// mongodb.once('open',function(){
//   console.log('mongodb connection open');
// })

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

app.use('/api', router);
app.listen(port, function(){
  console.log(`api running on port ${port}`);
})

router.route('/comments')
.get(function(req, res){
  Comment.find(function(err, comments){
    if(err)
    res.send(err);
    res.json(comments);

  });
})

.post(function(req, res){
  var comment = new Comment;

    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err, comment){
      if (err)
      res.send(req.body);
      res.json(comment.author);

    })
})

router.route('/comments/:comment_id')
.put(function(req, res) {
   Comment.findById(req.params.comment_id, function(err, comment) {
     if (err)
       res.send(err);
     //setting the new author and text to whatever was changed. If nothing was changed
     // we will not alter the field.
     (req.body.author) ? comment.author = req.body.author : null;
     (req.body.text) ? comment.text = req.body.text : null;
     //save comment
     comment.save(function(err) {
       if (err)
         res.send(err);
       res.json(comments);
     });
   });
 })
 //delete method for removing a comment from our database
 .delete(function(req, res) {
   //selects the comment by its ID, then removes it.
   Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
     if (err)
       res.send(err);
     res.json({ message: 'Comment has been deleted' })
   })
 });
