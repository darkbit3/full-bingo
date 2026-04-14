const express = require('express');
const amountController = require('../controller/amountController');

const router = express.Router();

// 10-api endpoint
router.get('/10-api', amountController.getAmount10);
router.post('/10-api/bet', amountController.placeBet10);

module.exports = router;