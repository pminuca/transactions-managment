const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', transactionRoutes);

module.exports = app;
