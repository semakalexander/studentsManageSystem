module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var GroupSchema = mongoose.Schema({
        name: {type: String, required: true},
        curator: {type: ObjectId, ref: 'user'},
        subjects: [{type: String}],
        students: [{type: ObjectId, ref: 'user', default: null}]
    });

    mongoose.model('group', GroupSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.Group = GroupSchema;
})();