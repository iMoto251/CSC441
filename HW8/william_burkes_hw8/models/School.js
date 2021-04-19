const mongoose = require('mongoose');
const { CourseSchema } = require('./Course')
var Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    id:{
        type: Number
    },
    school_name:{
        type: String
    },
    major_name:{
        type: String
    },
    minor_name:{
        type: String
    },
    course:{
        type: [CourseSchema]
    }

})

var School = mongoose.model('School', SchoolSchema);

module.exports = School;