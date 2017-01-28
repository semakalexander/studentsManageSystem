module.exports = (function () {
    var mongoose = require('mongoose');

    var ObjectId = mongoose.Schema.Types.ObjectId;

    var teacherGroupSchema = mongoose.Schema({
        teacher: {type: ObjectId, ref: 'user', required: true},
        groups: [{type: ObjectId, ref: 'group'}]
    });

    mongoose.model('teacherGroup', teacherGroupSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.TeacherGroup = teacherGroupSchema;

})();