var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
}, {timestamps: true});

// Requires population of author
CommentSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  };
};

// router.post('/:article/comments', auth.required, function(req, res, next) {
//   User.findById(req.payload.id).then(function(user){
//     if(!user){ return res.sendStatus(401); }
//
//     var comment = new Comment(req.body.comment);
//     comment.article = req.article;
//     comment.author = user;
//
//     return commment.save().then(function(){
//       req.article.comments.push(comment);
//
//       return req.article.save().then(function(article) {
//         res.json({comment: comment.toJSONFor(user)});
//       });
//     });
//   }).catch(next);
// });
//
// router.get('/:article/comments', auth.optional, function(req, res, next){
//   Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
//     return req.article.populate({
//       path: 'comments',
//       populate: {
//         path: 'author'
//       },
//       options: {
//         sort: {
//           createdAt: 'desc'
//         }
//       }
//     }).execPopulate().then(function(article) {
//       return res.json({comments: req.article.comments.map(function(comment){
//         return comment.toJSONFor(user);
//       })});
//     });
//   }).catch(next);
// });
//
// router.param('comment', function(req, res, next, id){
//   Comment.findById(id).then(function(comment){
//     if(!comment) { return res.sendStatus(404); }
//
//     req.comment = comment;
//
//     return next();
//   }).catch(next);
// });
//
// router.delete('/:article/comments/:comment', auth.required, function(req, res, next) {
//   if(req.comment.author.toString() === req.payload.id.toString()){
//     req.article.comments.remove(req.comment._id);
//     req.article.save()
//       .then(Comment.find({_id: req.comment._id}).remove().exec())
//       .then(function(){
//         res.sendStatus(204);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });


mongoose.model('Comment', CommentSchema);
