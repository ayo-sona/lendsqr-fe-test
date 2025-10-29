import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/userdetails/userdetails";
import Dashboard from "./pages/Dashboard/dashboard";

const App = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<Navigate to="/dashboard" replace />} 
      />

      <Route 
        path="/login" 
        element={<Login />} 
      />

      <Route 
        path="/dashboard" 
        element={<Dashboard />} 
      />

      <Route 
        path="/users" 
        element={<Users />} 
      />

      <Route 
        path="/users/:userId" 
        element={<UserDetails />} 
      />

      <Route 
        path="*" 
        element={<Navigate to="/dashboard" replace />} 
      />
    </Routes>
  );
};

export default App;