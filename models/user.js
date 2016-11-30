module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;


    var UserSchema = mongoose.Schema({
        email:      {type: String, required: true},
        password:   {type: String, required: true},
        firstName:  {type: String, required: true},
        lastName:   {type: String, required: true},
        role:       {type: String, required: true, default: 'user'},
        course:     {type: Number, enum: [1, 2, 3, 4, 5, 6]},
        age:        {type: Number},
        group:      {type: ObjectId, ref: 'group', default: null},
        marks:      {type: mongoose.Schema.Types.Object, default: null} // { 'subject': mark }
    }, {collection: 'users'});


    mongoose.model('user', UserSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.User = UserSchema;
})();