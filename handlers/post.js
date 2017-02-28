var mongoose = require('mongoose');

var postSchema = mongoose.Schemas.Post;
var commentSchema = mongoose.Schemas.Comment;
var notificationSchema = mongoose.Schemas.Notification;
var userSchema = mongoose.Schemas.User;

var Module = function (app, models) {
    var postModel = models.get('post', postSchema);
    var commentModel = models.get('comment', commentSchema);
    var notificationModel = models.get('notification', notificationSchema);
    var userModel = models.get('user', userSchema);

    this.getAllPosts = function (req, res, next) {
        postModel
            .find({})
            .populate([{
                path: "author"
            }, {
                path: "categories"
            }, {
                path: "comments",
                populate: {
                    path: "author"
                }
            }])
            .exec(function (err, posts) {
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
        if (!title.length || !content.length) {
            err = new Error('Error fields');
            err.status = 400;
            return next(err);
        }

        var session = req.session;
        var userId = session.userId;
        body.author = userId;

        var post = new postModel(body);
        post.save(function (err) {
            if (err) {
                return next(err);
            }

            var notification = new notificationModel({
                message: req.session.userName + ' виклав новий пост "' + title + '"',
                dateOfCreation: new Date()
            });

            notification.save(function (err, savedNotification) {
                if (err) {
                    return next(err);
                }
                userModel
                    .update(
                        {subscribing: userId},
                        {
                            $push: {'notifications.elements': savedNotification._id},
                            $inc: {'notifications.newCount': 1}
                        },
                        {multi: true},
                        function (err) {
                            if (err) {
                                return next(err);
                            }
                            post.populate('categories', function (err) {
                                if (err) {
                                    return next(err);
                                }
                                res.status(200).send(post);
                            });
                        });
            });

        });
    };

    this.writeComment = function (req, res, next) {
        var body = req.body;
        var postId = body.postId;
        var content = body.content;
        var dateOfCreation = body.dateOfCreation;

        var userId = req.session.userId;

        var comment = new commentModel({
            author: userId,
            content: content,
            dateOfCreation: dateOfCreation
        });

        comment.save(function (err) {
            if (err) {
                return next(err)
            }
            postModel
                .findOneAndUpdate({_id: postId}, {$push: {'comments': comment._id}}, {new: true})
                .exec(function (err) {
                    if (err) {
                        return next(err);
                    }
                    comment.populate('author', function (err) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).send(comment);
                    });
                });
        });
    };


    this.deletePostById = function (req, res, next) {
        postModel
            .remove({_id: req.params.id})
            .exec(function (err, resp) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(resp);
            });
    };
};

module.exports = Module;
