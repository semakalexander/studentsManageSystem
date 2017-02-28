var mongoose = require('mongoose');

var subjectSchema = mongoose.Schemas.Subject;
var teacherSubjectSchema = mongoose.Schemas.TeacherSubject;

var Module = function (models) {
    var subjectModel = models.get('subject', subjectSchema);
    var teacherSubjectModel = models.get('teacherSubject', teacherSubjectSchema);

    this.getAllSubjects = function (req, res, next) {
        subjectModel.find({}, function (err, subjects) {
            if (err) {
                return next(err);
            }
            res.status(200).send(subjects);
        });
    };

    this.getSubjectsByTeacher = function (req, res, next) {
        var teacherId = req.query.teacherId;
        teacherSubjectModel
            .find({teacher: teacherId})
            .populate('subjects')
            .exec(function (err, teacherSubjects) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(teacherSubjects);
            });
    };


    this.createSubject = function (req, res, next) {
        var body = req.body;
        var name = body.name;
        if (!name || !name.length) {
            var err = new Error('Error fields!');
            err.status = 400;
            return next(err);
        }

        var subject = new subjectModel(body);
        subject.save(function (err) {
            if (err) {
                return next(err);
            }

            res.status(200).send(subject);
        });
    };


    this.subscribeTeacherOnSubject = function (req, res, next) {
        var teacher = req.body.teacherId;
        var subjectId = req.body.subjectId;
        teacherSubjectModel
            .findOneAndUpdate({teacher: teacher}, {$push: {'subjects': subjectId}}, {new: true})
            .exec(function (err, teacherSubject) {
                if (err) {
                    return next(err);
                }
                if(teacherSubject==null){
                    teacherSubject = new teacherSubjectModel({
                        teacher: teacher,
                        subjects: [subjectId]
                    });
                    teacherSubject.save(function(err){
                        if (err) {
                            return next(err);
                        }
                    });
                }
                res.status(200).send(teacherSubject);
            });
    };

    this.unsubscribeTeacherOnSubject = function (req, res, next) {
        var teacher = req.body.teacherId;
        var subjectId = req.body.subjectId;
        teacherSubjectModel
            .findOneAndUpdate({teacher: teacher}, {$pull: {'subjects': subjectId}}, {new: true})
            .exec(function (err, teacherSubject) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(teacherSubject);
            });
    };

    this.editSubjectById = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        subjectModel.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).exec(function (err, subject) {
            if (err) {
                return next(err);
            }
            res.status(200).send(subject);
        });
    };


    this.deleteSubjectById = function (req, res, next) {
        subjectModel.remove({_id: req.params.id}).exec(function (err, resp) {
            if (err) {
                return next(err);
            }
            res.status(200).send(resp);
        })
    };
};
module.exports = Module;