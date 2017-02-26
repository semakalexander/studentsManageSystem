module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;


    var UserSchema = mongoose.Schema({
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        login: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        role: {type: String, required: true, default: 'student'},
        course: {type: Number, enum: [1, 2, 3, 4, 5, 6], default: 1},
        age: {type: Number, default: 18},
        group: {type: ObjectId, ref: 'group', default: null},
        marks: [{ObjectId: ObjectId}],// { subject: mark }
        img: {type: String, required: true, default: 'images/profile_photos/default_user.png'},
        subscribers: [{type: ObjectId, ref: 'user'}],
        subscribing: [{type: ObjectId, ref: 'user'}],
        notifications: {
            elements: [{type: ObjectId, ref: 'notification'}],
            newCount: {type: Number, default: 0}
        },
        key:String
    }, {collection: 'users'});


    mongoose.model('user', UserSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.User = UserSchema;
})();