const express = require('express');
const router = express.Router();
const { getPartners, getMoU } = require('../controllers/apiController');

router.get('/partners', getPartners);
router.get('/mou', getMoU);

module.exports = router;