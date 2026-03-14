const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
    getAnalytics,
    createStandard, getStandards, deleteStandard,
    createSubject, getSubjects, deleteSubject,
    createChapter, getChapters, deleteChapter,
    addVideo, addNote, addMCQ,
    getStudents, getResults
} = require('../controllers/adminController');

router.use(protect);
router.use(authorize('admin'));

router.get('/analytics', getAnalytics);

router.route('/standards')
    .get(getStandards)
    .post(createStandard);
router.delete('/standards/:id', deleteStandard);

router.route('/subjects')
    .get(getSubjects)
    .post(createSubject);
router.delete('/subjects/:id', deleteSubject);

router.route('/chapters')
    .get(getChapters)
    .post(createChapter);
router.delete('/chapters/:id', deleteChapter);

router.post('/videos', addVideo);
router.post('/notes', upload.single('file'), addNote);
router.post('/mcqs', addMCQ);

router.get('/students', getStudents);
router.get('/results', getResults);

module.exports = router;
