const { readData, writeData } = require("../data/utils");

const updateTransaction = (req, res) => {
  const transactions = readData();
  const transactionId = parseInt(req.params.id, 10);

  const transactionIndex = transactions.findIndex(
    (transaction) => transaction.id === transactionId
  );

  if (transactionIndex === -1) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  // Update transaction details
  transactions[transactionIndex] = {
    ...transactions[transactionIndex],
    ...req.body,
    amount: parseFloat(req.body.amount), // Convert to number

  };

  writeData(transactions);

  res.json(transactions[transactionIndex]);
};

module.exports = { updateTransaction };
