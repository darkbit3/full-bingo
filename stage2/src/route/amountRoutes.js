const express = require('express');
const amountController = require('../controller/amountController');

const router = express.Router();

// 20-api endpoint
router.get('/20-api', amountController.getAmount20);
router.post('/20-api/bet', amountController.placeBet20);

module.exports = router;