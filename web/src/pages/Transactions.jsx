import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../constants";
import { TransactionModal } from "../components/TransactionModal";

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Get transactions filtered by search
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(`${API_URL}/transactions`, {
          params: { category: search, date: search },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    getTransactions();
  }, [search]);

  // Delete a transaction by id
  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting a transaction:", error);
    }
  };

  return (
    <Container className="mt-4">
      {showModal && (
        <TransactionModal
          transactions={transactions}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          setTransactions={setTransactions}
          setShowModal={setShowModal}
        />
      )}

      <h1>All transactions</h1>
      <Form.Control
        type="text"
        placeholder="Search by category or date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-5 mb-5"
      />

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add a new transaction
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.category}</td>
              <td>{`${transaction.amount} €`}</td>
              <td>{transaction.description}</td>
              <td>{transaction.date}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
