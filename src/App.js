import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/content/Content";
import AddUser from "./components/content/AddUser";
import Dashboard from "./components/content/Dashboard";
import EditUser from "./components/content/EditUser";
import Settings from "./components/content/Settings";
import User from "./components/content/User";
import Login from "./components/content/Login";
import { useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const auth = useSelector((state) => state.auth);

  console.log(auth);


  return (
    <div className="App font-mont">
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard/users/:userId"
          element={auth.token ? <User /> : <Navigate to="/login" />}
        />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            auth.token && auth.role === "admin" ? (
              <Content />
            ) : (
              <Navigate to="/login" replace />
            )
          }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="edituser" element={<EditUser />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirect all other unmatched routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
