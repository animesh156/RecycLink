const express = require('express')
const router = express.Router()

const {protect, isSeller} = require('../middleware/authMiddleware')
const {WasteItem, WasteListings} = require('../controllers/wasteController')

// Create Waste (Ony Sellers)
router.post('/add', protect, isSeller,  WasteItem)

// Fetch ALl Wsaste listing
router.get('/', protect, WasteListings)

module.exports = router;