const { readData } = require("../data/utils");

const getTransactions = (req, res) => {
  const { category, date } = req.query;

  const transactions = readData();

  if (!category && !date) {
    return res.json(transactions);
  }

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (category &&
        transaction.category.toLowerCase().includes(category.toLowerCase())) ||
      (date && transaction.date.includes(date))
  );

  res.json(filteredTransactions);
};

module.exports = { getTransactions };
