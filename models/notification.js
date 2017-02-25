module.exports = (function () {
    var mongoose = require('mongoose');

    var notificationSchema = mongoose.Schema({
        message: {type: String, required: true},
        dateOfCreation: {type: Date, required: true}
    });

    mongoose.model('notification', notificationSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.Notification = notificationSchema;
})();

