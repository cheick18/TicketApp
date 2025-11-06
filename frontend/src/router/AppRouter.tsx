import { useContext } from "react";
import { Routes, Route } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { decodetoken } from "../utiliy/DecodeToken";
import PrivateRoute from "./PrivateRouter";

import Dashboard from "../page/user/Dashboard";
import DashboardUser from "../page/user/DashboardUser";
import DashboardSupport from "../page/user/DashboardSupport";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import ManageTickets from "../page/ticket/ManageTicket";
import UserList from "../components/users/UserList";

const AppRouter = () => {
  const auth = useContext(AuthContext);
  const role = decodetoken(auth?.token); 

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <Dashboard />;
      case "user":
        return <DashboardUser />;
      case "support":
        return <DashboardSupport />;
      default:
        return <Login />; // fallback si pas connecté
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Une seule route dynamique pour le tableau de bord */}
      <Route
        path="/"
        element={
          <PrivateRoute roles={["user", "admin", "support"]}>
            {renderDashboard()}
          </PrivateRoute>
        }
      />

      {/* Tickets */}
      <Route
        path="/tickets"
        element={
          <PrivateRoute roles={["user", "support", "admin"]}>
            <ManageTickets />
          </PrivateRoute>
        }
      />

      {/* Liste des utilisateurs */}
      <Route
        path="/users"
        element={
          <PrivateRoute roles={["admin"]}>
            <UserList />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
