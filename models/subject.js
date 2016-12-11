module.exports = (function () {
    var mongoose = require('mongoose');

    var subjectSchema = mongoose.Schema({
        name: {type: String, required: true}
    });

    mongoose.model('subject', subjectSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.Subject = subjectSchema;

})();