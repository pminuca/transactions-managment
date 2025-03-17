import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { Navigation } from "./components/Navigation";
import { AppRoutes } from "./components/AppRoutes";

export const App = () => {
  return (
    <Router>
      <Container fluid>
        <Row>
          {/* Sidebar Navigation (Left Column) */}
          <Col xs={3} md={2} className="p-0">
            <Navigation />
          </Col>

          {/* Main Content (Right Column) */}
          <Col xs={9} md={10} className="p-4">
            <AppRoutes />
          </Col>
        </Row>
      </Container>
    </Router>
  );
};
