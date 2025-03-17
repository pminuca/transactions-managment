const { readData, writeData } = require("../data/utils");

const deleteTransaction = (req, res) => {
  const transactions = readData();
  const transactionId = parseInt(req.params.id, 10);

  const updatedTransactions = transactions.filter(
    (transaction) => transaction.id !== transactionId
  );

  if (transactions.length === updatedTransactions.length) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  writeData(updatedTransactions);
  res.status(204).end();
};

module.exports = { deleteTransaction };
