module.exports = (function () {
    var mongoose = require('mongoose');

    var ConfirmKeySchema = mongoose.Schema({
        email: String,
        key: String,
        type: String
    });

    mongoose.model('confirmKey', ConfirmKeySchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.ConfirmKey = ConfirmKeySchema;
})();