const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getSubjectsByStandard,
    getChaptersBySubject,
    getChapterContent,
    submitQuizResult,
    getMyResults
} = require('../controllers/studentController');

router.use(protect);
router.use(authorize('student'));

router.get('/subjects', getSubjectsByStandard);
router.get('/subjects/:subjectId/chapters', getChaptersBySubject);
router.get('/chapters/:chapterId/content', getChapterContent);
router.post('/results', submitQuizResult);
router.get('/results', getMyResults);

module.exports = router;
