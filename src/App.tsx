import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./presentation/layout/Layout";
import HomePage from "./presentation/pages/HomePage";
import AddExpensePage from "./presentation/pages/AddExpensePage";
import EditExpensePage from "./presentation/pages/EditExpensePage";
import ExpenseManagement from "./presentation/pages/ExpenseManagement";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Define la ruta para HomePage */}
          <Route index element={<HomePage />} />
          <Route path="expense-management" element={<ExpenseManagement />} />
          <Route path="add-expense" element={<AddExpensePage />} />
          <Route path="edit-expense" element={<EditExpensePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
