const express = require('express');
const router = express.Router();
const { getTransactions } = require('../controllers/getTransactions');
const { addTransaction } = require('../controllers/addTransaction');
const { deleteTransaction } = require('../controllers/deleteTransaction');
const { updateTransaction } = require('../controllers/updateTransaction');
const { getSummaryByMonth } = require('../controllers/getSummaryByMonth');
const { getBalance } = require('../controllers/getBalance');


router.get('/transactions', getTransactions);
router.post('/transactions', addTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.put('/transactions/:id', updateTransaction);
router.get('/summary', getSummaryByMonth);
router.get('/balance', getBalance);


module.exports = router;
