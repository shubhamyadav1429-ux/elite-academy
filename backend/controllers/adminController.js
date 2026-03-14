const Standard = require('../models/Standard');
const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const Video = require('../models/Video');
const Note = require('../models/Note');
const MCQ = require('../models/MCQ');
const Result = require('../models/Result');
const User = require('../models/User');

// --- Analytics ---
exports.getAnalytics = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalSubjects = await Subject.countDocuments();
        const totalTestsTaken = await Result.countDocuments();
        res.status(200).json({
            success: true,
            data: { totalStudents, totalSubjects, totalTestsTaken }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- Standards ---
exports.createStandard = async (req, res) => {
    try {
        const standard = await Standard.create(req.body);
        res.status(201).json({ success: true, data: standard });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getStandards = async (req, res) => {
    try {
        const standards = await Standard.find();
        res.status(200).json({ success: true, data: standards });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.deleteStandard = async (req, res) => {
    try {
        await Standard.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Subjects ---
exports.createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json({ success: true, data: subject });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('standard', 'name');
        res.status(200).json({ success: true, data: subjects });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
exports.deleteSubject = async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Chapters ---
exports.createChapter = async (req, res) => {
    try {
        const chapter = await Chapter.create(req.body);
        res.status(201).json({ success: true, data: chapter });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
exports.getChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find().populate({ path: 'subject', populate: { path: 'standard' } });
        res.status(200).json({ success: true, data: chapters });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
exports.deleteChapter = async (req, res) => {
    try {
        await Chapter.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Content (Videos, Notes, MCQs) ---
exports.addVideo = async (req, res) => {
    try {
        const video = await Video.create(req.body);
        res.status(201).json({ success: true, data: video });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
exports.addNote = async (req, res) => {
    try {
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const note = await Note.create({
            title: req.body.title,
            chapter: req.body.chapter,
            fileUrl
        });
        res.status(201).json({ success: true, data: note });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
exports.addMCQ = async (req, res) => {
    try {
        const mcq = await MCQ.create(req.body);
        res.status(201).json({ success: true, data: mcq });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Students & Scores ---
exports.getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).populate('standard', 'name');
        res.status(200).json({ success: true, data: students });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
exports.getResults = async (req, res) => {
    try {
        const results = await Result.find()
            .populate('student', 'name email')
            .populate('chapter', 'title');
        res.status(200).json({ success: true, data: results });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
