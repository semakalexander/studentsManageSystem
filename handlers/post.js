var mongoose = require('mongoose');


var postSchema = mongoose.Schemas.Post;
var commentSchema = mongoose.Schemas.Comment;

var Module = function (models) {
    var postModel = models.get('post', postSchema);
    var commentModel = models.get('comment', commentSchema);

    this.getAllPosts = function (req, res, next) {
        postModel.find({}).populate('categories author').exec(function (err, posts) {
            if (err) {
                return next(err);
            }
            res.status(200).send(posts);
        });
    };


    this.createPost = function (req, res, next) {
        var body = req.body;
        var title = body.title;
        var categories = body.categories;
        var content = body.content;

        var err;
        if (!title.length || !categories || !content) {
            err = new Error('Error fields');
            err.status = 400;
            return next(err);
        }

        var session = req.session;
        body.author = session.userId;

        var post = new postModel(body);
        post.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(200).send(post);
        });
    };


    this.editPostById = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        postModel.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).exec(function (err, post) {
            if (err) {
                return next(err);
            }
            res.status(200).send(post);
        });
    };

    this.deletePostById = function (req, res, next) {
        postModel.remove({_id: req.params.id}).exec(function (err, resp) {
            if (err) {
                return next(err);
            }
            res.status(200).send(resp);
        });
    };

    this.writeComment = function (req, res, next) {
        var body = req.body;
        var postId = body.postId;
        var userId = req.session.userId;
        var content = body.content;
        var comment = new commentModel({
            author: userId,
            content: content
        });
        comment.save({
            success: function () {
                postModel
                    .findOneAndUpdate({_id: postId}, {$push: {'comments': comment._id}}, {new: true})
                    .exec(function (err, post) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).send(post);
                    });
            }
        });
    };
};

module.exports = Module;
