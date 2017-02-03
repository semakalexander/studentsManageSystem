module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var commentSchema = mongoose.Schema({
        content: {type: String, required: true},
        author: {type: ObjectId, ref: 'user', required: true},
        dateOfCreation: {type: Date, required: true, default: new Date()}
    });

    mongoose.model('comment', commentSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.Comment = commentSchema;

})();

