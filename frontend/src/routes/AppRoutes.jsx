import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import UploadedFiles from "../pages/UploadedFiles";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import ActivityLog from "../pages/ActivityLog";
import AdminPanel from "../pages/AdminPanel";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activity-log"
        element={
          <ProtectedRoute>
            <ActivityLog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/files"
        element={
          <ProtectedRoute>
            <UploadedFiles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
