const express = require('express');
const amountController = require('../controller/amountController');

const router = express.Router();

// 30-api endpoint
router.get('/30-api', amountController.getAmount30);
router.post('/30-api/bet', amountController.placeBet30);

module.exports = router;