import React, { useEffect, useState } from "react";

import Login from "../Login";
import { checkAuth } from "../../services/user";
import Dashboard from "../Dashboard";

const AuthWrapper: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const data = await checkAuth();
      setUser(data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (user) {
    return <Dashboard setUser={setUser} />;
  }

  return <Login setUser={setUser} />;
};

export default AuthWrapper;
