module.exports = (function () {
    var mongoose = require('mongoose');

    var categorySchema = mongoose.Schema({
        name: {type: String, required: true}

    });

    mongoose.model('category', categorySchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.Category = categorySchema;

})();