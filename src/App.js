import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Content from "./components/content/Content";
import AddUser from "./components/content/AddUser";
import Dashboard from "./components/content/Dashboard";
import EditUser from "./components/content/EditUser";
import Settings from "./components/content/Settings";
import User from "./components/content/User";
import Login from "./components/content/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompanyForm from "./components/content/CompanyForm";
import Companies from "./components/content/Companies";

function App() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(auth)

  useEffect(() => {
    if (auth.token && auth.role === "employee") {
      navigate(`dashboard/users/${auth.id}`);
    }
  }, [auth, navigate]);

  const isSuperAdmin = auth.token && auth.role === "superAdmin";
  const isAdmin = auth.token && auth.role === "Admin";

  return (
    <div className="App font-mont">
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="download-contact/:userId" element={<User />} />

        {/* Protected Routes for SuperAdmin and Admin */}
        <Route
          path="/"
          element={
            isSuperAdmin || isAdmin ? (
              <Content />
            ) : (
              <Navigate to="/login" replace />
            )
          }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<AddUser />} />
          <Route path="edituser/:userId" element={<EditUser />} />
          <Route path="settings" element={<Settings />} />

          {/* SuperAdmin exclusive route */}
          {isSuperAdmin && (
            <Route path="companies" element={<Companies />} />
          )}
          {isSuperAdmin && (
            <Route path="company" element={<CompanyForm />} />
          )}
        </Route>

        {/* Route accessible for specific user roles */}
        <Route
          path="dashboard/users/:userId"
          element={auth.token ? <User /> : <Navigate to="/login" />}
        />

        {/* Redirect all other unmatched routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
