const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    instructor_name:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    }

})

var Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;