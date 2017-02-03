var mongoose = require('mongoose');

var markSchema = mongoose.Schemas.Mark;

var Module = function (models) {
    var markModel = models.get('category', markSchema);

    this.getAllMarks = function (req, res, next) {
        markModel.find({}, function (err, marks) {
            if (err) {
                return next(err);
            }
            res.status(200).send(marks);
        });
    };

    this.createMark = function (req, res, next) {
        var mark  = {
            january: [],
            february: [],
            march: [],
            april: [],
            may: [],
            june: [],
            jule: [],
            august: [],
            september: [],
            october: [],
            november: [],
            december: []
        };
        for(var month in mark){
            for(var i=0; i<32; i++){
                mark[month].push(-1);
            }
        }

        mark = new markModel(mark);
        mark.save(function (err) {
            if (err) {
                return next(err);
            }

            res.status(200).send(mark);
        });
    };

    this.editMarkyById = function (req, res, next) {
        var body = req.body;
        var id = body.id;
        var month = body.month;
        var day = body.day;
        var value = body.value;

        markModel.findOne({_id: id}, function (err, mark) {
            if (err) {
                return next(err);
            }

            mark[month][day] = value;
            mark.save(function (err) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(mark);
            });
        });
    };

    this.deleteMarkById = function (req, res, next) {
        markModel.remove({_id: req.params.id}).exec(function (err, resp) {
            if (err) {
                return next(err);
            }
            res.status(200).send(resp);
        })
    };
};
module.exports = Module;