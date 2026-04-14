const express = require('express');
const amountController = require('../controller/amountController');

const router = express.Router();

// 100-api endpoint
router.get('/100-api', amountController.getAmount100);
router.post('/100-api/bet', amountController.placeBet100);

module.exports = router;