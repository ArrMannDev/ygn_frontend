import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Classes } from "./pages/Classes";
import { Trainers } from "./pages/Trainers";
import { Memberships } from "./pages/Memberships";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { About } from "./pages/About";

import { Profile } from "./pages/Profile";
import { AdminDashboard } from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/memberships" element={<Memberships />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
