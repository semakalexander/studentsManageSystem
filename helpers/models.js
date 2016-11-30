var models = function (db) {
    function get(collection, schema) {
        var model;
        model = db.models[collection];

        return model || db.model(collection, schema);
    }

    return {
        get: get
    };
};

module.exports = models;