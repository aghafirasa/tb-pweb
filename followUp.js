const express = require('express');
const router = express.Router();
const { index, create, store, destroy } = require('../controllers/followUpController');
const { isAuthenticated } = require('../middleware/auth');
const { isAdmin } = require('../middleware/acl');

router.get('/', isAuthenticated, isAdmin, index);
router.get('/create', isAuthenticated, isAdmin, create);
router.post('/store', isAuthenticated, isAdmin, store);
router.post('/delete/:id', isAuthenticated, isAdmin, destroy);

module.exports = router;