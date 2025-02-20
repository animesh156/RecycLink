const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser, getUserStatus} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/status', protect, getUserStatus)

module.exports = router;