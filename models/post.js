module.exports = (function () {
    var mongoose = require('mongoose');

    var ObjectId = mongoose.Schema.Types.ObjectId;

    var postSchema = mongoose.Schema({
        title: {type: String, required: true},
        categories: [{type: ObjectId, ref: 'category', required: true}],
        author: {type: ObjectId, ref: 'user', required: true},
        content: {type: String, required: true}
    });
    mongoose.model('post', postSchema);

    if(!mongoose.Schemas){
        mongoose.Schemas = {};
    }

    mongoose.Schemas.Post = postSchema;
})();