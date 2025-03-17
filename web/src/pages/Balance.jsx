import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../constants";
import { PieChart, Pie, Legend, ResponsiveContainer } from "recharts";

export const Balance = () => {
  const [balanceData, setBalanceData] = useState([]);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(`${API_URL}/balance`);
        setBalanceData([
          {
            name: "Income",
            value: response.data.income,
            fill: "#28a745", // Green
          },
          {
            name: "Expense",
            value: response.data.expense,
            fill: "#dc3545", // Red
          },
          {
            name: "Balance",
            value: response.data.balance,
            fill: "#007bff", // Blue
          },
        ]);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    getBalance();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Global balance</h1>

      <ResponsiveContainer className="mt-5" width="100%" height={300}>
        <PieChart>
          <Pie
            data={balanceData}
            dataKey="value"
            nameKey="name"
            cx="50%" // Center the chart horizontally
            cy="50%" // Center the chart vertically
            outerRadius={100} // Adjust the size of the pie chart
            fill="#8884d8" // Default color
            label
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
};
