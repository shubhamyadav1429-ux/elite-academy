const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a chapter title']
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chapter', ChapterSchema);
