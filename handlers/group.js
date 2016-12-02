var mongoose = require('mongoose');

var groupSchema = mongoose.Schemas.Group;

var Module = function (models) {
    var groupModel = models.get('group', groupSchema);

    this.createGroup = function (req, res, next) {
        var body = req.body;
        var name = body.name;
        var curator = body.curator;
        var subjects = body.subjects;

        var err;
        if (!name.length || !curator.length) {
            err = new Error('Check your fields');
            err.status = 401;
            return next(err);
        }

        var group = new groupModel('group', groupSchema);
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
        groupModel.removeOne({_id: req.params.id}).exec(function (err, resp) {
            if (err) {
                return next(err);
            }
            res.status(200).send(resp);
        })
    }


};


module.exports = Module;