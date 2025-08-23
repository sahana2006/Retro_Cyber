import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import RegistrationPage from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AccessDenied from "./pages/AccessDenied";
import Stage2True from "./pages/Stage2True";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stage-2-false" element={<AccessDenied />} />
      <Route path="/stage-2-true" element={<Stage2True />} />
    </Routes>
  );
}
export default App;
