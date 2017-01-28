module.exports = (function () {
    var mongoose = require('mongoose');

    var ObjectId = mongoose.Schema.Types.ObjectId;

    // модель набір оцінок.
    // місяць : масив оцінок, де перший елемент - загальна оцінка,
    // а всі інші це оцінки(або н-ки) за конкретний день(число це індекс елементу, значення - оцінки)
    var markSchema = mongoose.Schema({
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
    });

    mongoose.model('mark', markSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    mongoose.Schemas.Mark = markSchema;

})();