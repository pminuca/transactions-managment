import React, { useState } from "react";
import { Button, Form, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../constants";

export const TransactionModal = ({
  transactions,
  selectedTransaction,
  setSelectedTransaction,
  setTransactions,
  setShowModal,
}) => {
  const [newTransaction, setNewTransaction] = useState(
    selectedTransaction ?? {
      category: "",
      amount: 0,
      description: "",
      date: "",
    }
  );

  // Add a new transaction
  const handleAddTransaction = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/transactions`,
        newTransaction
      );
      setTransactions([response.data, ...transactions]);
      setShowModal(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Update an existing transaction
  const handleUpdateTransaction = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/transactions/${newTransaction.id}`,
        newTransaction
      );
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === selectedTransaction.id
            ? response.data
            : transaction
        )
      );
      setShowModal(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <Modal
      show={true}
      onHide={() => {
        setShowModal(false);
        setSelectedTransaction(null);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedTransaction ? "Edit transaction" : "Add a new transaction"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Dropdown
              onSelect={(category) =>
                setNewTransaction({ ...newTransaction, category })
              }
            >
              <Dropdown.Toggle
                variant="transparent"
                id="dropdown-basic"
                style={{
                  width: "100%",
                  border: "1px solid #ccc",

                  textAlign: "left", // Left-align the text
                }}
              >
                {newTransaction.category || "Select Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item eventKey="Income">Income</Dropdown.Item>
                <Dropdown.Item eventKey="Expense">Expense</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the amount"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the description"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the date"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  date: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModal(false);
            setSelectedTransaction(null);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={
            selectedTransaction ? handleUpdateTransaction : handleAddTransaction
          }
        >
          {selectedTransaction ? "Update transaction" : "Add transaction"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
