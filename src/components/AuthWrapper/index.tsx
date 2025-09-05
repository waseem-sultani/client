import React, { useEffect, useState } from "react";

import Login from "../Login";
import { checkAuth } from "../../services/user";
import Dashboard from "../Dashboard";

const AuthWrapper: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const data = await checkAuth();
      console.log("data", data);
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (user) {
    return <Dashboard setUser={setUser} />;
  }

  return <Login fetchUser={fetchUser} />;
};

export default AuthWrapper;
