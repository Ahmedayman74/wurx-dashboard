import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  Content,
  Login,
  Users,
  AddUser,
  EditUser,
  Companies,
  AddCompany,
  EditCompany,
  User,
} from "./pages";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {
    if (token && role === "employee") {
      navigate(`dashboard/users/${auth.id}`);
    }
  }, [token, role, navigate]);

  const isSuperAdmin = token && role === "superAdmin";
  const isAdmin = token && role === "Admin";

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
            token ? (
              isSuperAdmin || isAdmin ? (
                <Content />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }>
          <Route path="dashboard" element={<Users />} />
          <Route path="user" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="companies/edit/:id" element={<EditCompany />} />

          {/* SuperAdmin exclusive route */}
          {isSuperAdmin && <Route path="companies" element={<Companies />} />}
          {isSuperAdmin && <Route path="company" element={<AddCompany />} />}
        </Route>

        {/* Route accessible for specific user roles */}
        <Route
          path="dashboard/users/:userId"
          element={token ? <User /> : <Navigate to="/login" />}
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
