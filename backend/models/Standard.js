const mongoose = require('mongoose');

const StandardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a standard name (e.g. 8th Standard)'],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Standard', StandardSchema);
