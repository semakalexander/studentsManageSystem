var mongoose = require('mongoose');
var request = require('request');

var groupSchema = mongoose.Schemas.Group;
var userSchema = mongoose.Schemas.User;

var Module = function (models) {

    var groupModel = models.get('group', groupSchema);
    var userModel = models.get('user', userSchema);

    this.addUserToGroup = function (req, res, next) {
        var userId = req.body.userId;
        var groupId = req.body.groupId;

        userModel.findOneAndUpdate({_id: userId}, {group: groupId}, function (err) {
            if (err) {
                return next(err);
            }
        });

        groupModel.findOneAndUpdate({_id: groupId}, {$push: {'students': userId}}, function (err, result) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(result);
            }
        );
    };

    this.deleteUserFromGroup = function (req, res, next) {
        var userId = req.body.userId;
        var groupId = req.body.groupId;

        userModel.findOneAndUpdate({_id: userId}, {group: null}, function (err) {
            if (err) {
                return next(err);
            }
        });

        groupModel.findOneAndUpdate({_id: groupId}, {$pop: {'students': userId}}, function (err, result) {
            //POP not correct!!!
                if (err) {
                    return next(err);
                }
                res.status(200).send(result);
            }
        );

    };

    this.getAllGroups = function (req, res, next) {
        // groupModel.find({}, function (err, groups) {
        //     if (err) {
        //         next(err);
        //     }
        //    res.status(200).send(groups);
        // });
        groupModel.find({}).populate('curator students subjects').exec(function (err, groups) {
            if (err) {
                return next(err);
            }

            res.status(200).send(groups);

        });
    };

    this.createGroup = function (req, res, next) {
        var body = req.body;
        var name = body.name;
        var curator = body.curator;
        var subjects = body.subjects;

        var err;
        if (!name || !name.length) {
            err = new Error('Check your fields');
            err.status = 401;
            return next(err);
        }

        var group = new groupModel(body);
        group.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(200).send(group);
        });
    };

    this.editGroupById = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        groupModel.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).exec(function (err, group) {
            if (err) {
                return next(err);
            }
            res.status(200).send(group);
        });
    };

    this.deleteGroupById = function (req, res, next) {
        groupModel.remove({_id: req.params.id}).exec(function (err, resp) {
            if (err) {
                return next(err);
            }
            res.status(200).send(resp);
        })
    };

};

module.exports = Module;
