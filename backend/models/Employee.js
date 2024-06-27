const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
