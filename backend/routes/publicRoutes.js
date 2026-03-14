const express = require('express');
const router = express.Router();
const Standard = require('../models/Standard');

router.get('/standards', async (req, res) => {
    try {
        const standards = await Standard.find();
        res.status(200).json({ success: true, data: standards });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
