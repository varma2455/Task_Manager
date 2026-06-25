import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully!");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/dashboard">
          <FaTasks className="me-2" />
          Task Manager
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Dashboard */}
            <li className="nav-item me-3">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>

            {/* User */}
            <li className="nav-item me-3 d-flex align-items-center text-white">
              <FaUserCircle className="me-2" size={22} />
              <span>{user?.name}</span>
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-danger"
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;