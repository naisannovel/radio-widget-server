const router = require('express').Router();
const { login, signUp } = require('../controllers/localAuthController');

router.post('/signup', signUp);
router.post('/login', login)

module.exports = router;