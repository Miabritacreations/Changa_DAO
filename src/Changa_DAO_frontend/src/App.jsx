import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Voting from "./pages/Voting";
import Proposals from "./pages/Proposals";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
