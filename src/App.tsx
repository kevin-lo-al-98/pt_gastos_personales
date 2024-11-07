import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./presentation/layout/Layout";
import HomePage from "./presentation/pages/HomePage";
import AddExpensePage from "./presentation/pages/AddExpensePage";
import EditExpensePage from "./presentation/pages/EditExpensePage";
import ExpenseManagement from "./presentation/pages/ExpenseManagement";
import { SidebarProvider } from "./presentation/hooks/SidebarContext";
import { ROUTES_NAVIGATION } from "./domain/constants/constants";
import ExpenseChart from "./presentation/pages/ExpenseChart";
import "./App.css";

const App: React.FC = () => {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path={ROUTES_NAVIGATION.EXPENSES_MANAGEMENT}
              element={<ExpenseManagement />}
            />
            <Route
              path={ROUTES_NAVIGATION.EXPENSES_CHART}
              element={<ExpenseChart />}
            />
            <Route
              path={ROUTES_NAVIGATION.ADD_EXPENSE}
              element={<AddExpensePage />}
            />
            <Route
              path={ROUTES_NAVIGATION.EDIT_EXPENSE}
              element={<EditExpensePage />}
            />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
};

export default App;
