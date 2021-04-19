const mongoose = require('mongoose');
const {AssignmentSchema} = require('./Assignment');
const {InstructorSchema} = require('./Instructor');
var Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_name:{
        type: String
    },
    instructor_name:{
        type: [InstructorSchema]
    },
    credit_hours:{
        type: Number
    },
    assignment:{
        type: [AssignmentSchema]
    }

})

var Course = mongoose.model('Course', CourseSchema);

module.exports = Course;