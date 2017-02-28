module.exports = (function () {
    var mongoose = require('mongoose');

    var ObjectId = mongoose.Schema.Types.ObjectId;

    var teacherSubjectSchema = mongoose.Schema({
        teacher: {type: ObjectId, ref: 'user', required: true},
        subjects: [{type: ObjectId, ref: 'subject'}]
    });

    mongoose.model('teacherSubject', teacherSubjectSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.TeacherSubject = teacherSubjectSchema;
})();