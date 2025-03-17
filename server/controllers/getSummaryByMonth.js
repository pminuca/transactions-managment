const { readData } = require("../data/utils");

const getSummaryByMonth = (req, res) => {
  const transactions = readData();

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    if (!transaction.date) return acc;

    const month = transaction.date.slice(0, 7); // Extract YYYY-MM from date

    // If there is no entry for the month, create one
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }

    if (transaction.category === "Income") {
      acc[month].income += transaction.amount;
    } else if (transaction.category === "Expense") {
      acc[month].expense += transaction.amount;
    }

    return acc;
  }, {});

  // Convert object to array
  const resultArray = Object.entries(groupedTransactions).map(
    ([date, values]) => ({
      date,
      income: values.income,
      expense: values.expense,
      balance: values.income - values.expense,
    })
  );

  res.json(resultArray);
};

module.exports = { getSummaryByMonth };
