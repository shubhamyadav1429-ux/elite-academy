const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const Video = require('../models/Video');
const Note = require('../models/Note');
const MCQ = require('../models/MCQ');
const Result = require('../models/Result');

exports.getSubjectsByStandard = async (req, res) => {
    try {
        const standardId = req.query.std || req.user.standard;
        const subjects = await Subject.find({ standard: standardId });
        res.status(200).json({ success: true, data: subjects });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getChaptersBySubject = async (req, res) => {
    try {
        const chapters = await Chapter.find({ subject: req.params.subjectId });
        res.status(200).json({ success: true, data: chapters });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getChapterContent = async (req, res) => {
    try {
        const chapterId = req.params.chapterId;
        const videos = await Video.find({ chapter: chapterId });
        const notes = await Note.find({ chapter: chapterId });
        const mcqs = await MCQ.find({ chapter: chapterId });

        res.status(200).json({
            success: true,
            data: {
                videos,
                notes,
                mcqs
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.submitQuizResult = async (req, res) => {
    try {
        const { chapterId, score, total } = req.body;
        const result = await Result.create({
            student: req.user._id,
            chapter: chapterId,
            score,
            total
        });
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getMyResults = async (req, res) => {
    try {
        const results = await Result.find({ student: req.user._id }).populate('chapter', 'title');
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
