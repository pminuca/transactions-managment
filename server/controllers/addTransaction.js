const { readData, writeData } = require("../data/utils");

const addTransaction = (req, res) => {
  const transactions = readData();

  const newTransaction = {
    id: transactions[0].id + 1, // Next id
    ...req.body,
    amount: parseFloat(req.body.amount), // Convert to number
  };

  transactions.unshift(newTransaction); // Insert in the beginning of the array

  writeData(transactions);

  res.status(201).json(newTransaction);
};

module.exports = { addTransaction };
