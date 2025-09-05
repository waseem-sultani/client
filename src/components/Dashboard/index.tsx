import React from "react";
import { checkAuth, handleLogout } from "../../services/user";

const Dashboard = ({ setUser }: { setUser: React.Dispatch<any> }) => {
  const logout = async () => {
    handleLogout();
    // checkAuth();
    setUser(null);
  };
  return (
    <div>
      Dashboard
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
