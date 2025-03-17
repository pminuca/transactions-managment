import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../constants";

export const Summary = () => {
  const [summary, setSummary] = useState([]);

  // Get summary by mount
  useEffect(() => {
    const getSummary = async () => {
      try {
        const response = await axios.get(`${API_URL}/summary`);
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    getSummary();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Summary by month</h1>

      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Date</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {summary.map((transaction) => (
            <tr key={transaction.date}>
              <td>{transaction.date}</td>
              <td>{`${transaction.income} €`}</td>
              <td>{`${transaction.expense} €`}</td>
              <td>{`${transaction.balance} €`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
