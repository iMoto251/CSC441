const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    id:{
        type: Number
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    academic_standing:{
        type: String
    }

})

var User = mongoose.model('User', UserSchema);

module.exports = User;