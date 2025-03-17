import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { List, PieChart } from "react-bootstrap-icons"; // Updated icons
import { ROUTES } from "../constants";

export const Navigation = () => {
  return (
    <div
      className="d-flex flex-column bg-dark p-3 vh-100"
      style={{ borderRight: "2px solid #444" }}
    >
      <h4 className="text-center text-light mb-4">Menu</h4>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to={ROUTES.TRANSACTIONS}
          className="d-flex align-items-center py-2 mb-2 text-light rounded"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <List className="me-2" style={{ fontSize: "1.2rem" }} />
          Transactions
        </Nav.Link>
        <Nav.Link
          as={Link}
          to={ROUTES.SUMMARY}
          className="d-flex align-items-center py-2 mb-2 text-light rounded"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <List className="me-2" style={{ fontSize: "1.2rem" }} />
          Summary
        </Nav.Link>
        <Nav.Link
          as={Link}
          to={ROUTES.BALANCE}
          className="d-flex align-items-center py-2 mb-2 text-light rounded"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <PieChart className="me-2" style={{ fontSize: "1.2rem" }} />
          Balance
        </Nav.Link>
      </Nav>
    </div>
  );
};
