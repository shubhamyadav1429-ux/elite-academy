const mongoose = require('mongoose');

const MCQSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please add a question']
    },
    options: {
        type: [String],
        required: [true, 'Please provide 4 options'],
        validate: [arrayLimit, '{PATH} exceeds the limit of 4']
    },
    correctAnswer: {
        type: String,
        required: [true, 'Please provide the correct answer']
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

function arrayLimit(val) {
    return val.length === 4;
}

module.exports = mongoose.model('MCQ', MCQSchema);
