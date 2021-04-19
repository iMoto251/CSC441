const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    assigned_date:{
        type: Date
    },
    due_date:{
        type: Date
    },
    late_due_date:{
        type: Date
    },
    max_points:{
        type: Number
    }

})

var Assignment = mongoose.model('Course', AssignmentSchema);

module.exports = Assignment;