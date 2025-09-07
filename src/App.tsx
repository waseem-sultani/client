import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AssignedIssues from "./components/AssignedIssues";
import AuthWrapper from "./components/AuthWrapper";
import MyIssues from "./components/MyIssues";
import Signup from "./components/Signup";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthWrapper />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/issues" element={<MyIssues />} />
          <Route path="/assignedIssues" element={<AssignedIssues />} />
        </Routes>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
