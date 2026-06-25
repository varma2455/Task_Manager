import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { useAuth } from "./context/AuthContext";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
}

// Public Route Component
function PublicRoute({ children }) {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" replace /> : children;
}

// 404 Page
function NotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 text-center"
    >
      <div>
        <h1 className="display-1 fw-bold">404</h1>
        <p className="lead">Page Not Found</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        {/* Redirect Home */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;