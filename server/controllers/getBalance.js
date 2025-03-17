const { readData } = require("../data/utils");

const getBalance = (req, res) => {
  const transactions = readData();

  const balance = transactions.reduce(
    (acc, transaction) => {
      if (transaction.category === "Income") {
        acc.income += transaction.amount;
      } else if (transaction.category === "Expense") {
        acc.expense += transaction.amount;
      }

      return acc;
    },
    { income: 0, expense: 0 }
  );

  res.json({ ...balance, balance: balance.income - balance.expense });
};

module.exports = { getBalance };
