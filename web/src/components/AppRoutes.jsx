import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Transactions } from "../pages/Transactions";
import { Summary } from "../pages/Summary";
import { Balance } from "../pages/Balance";
import { ROUTES } from "../constants";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect "/" to Transactions */}
      <Route path="/" element={<Navigate to={ROUTES.TRANSACTIONS} replace />} />

      <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
      <Route path={ROUTES.SUMMARY} element={<Summary />} />
      <Route path={ROUTES.BALANCE} element={<Balance />} />
    </Routes>
  );
};
