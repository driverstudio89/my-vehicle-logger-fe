import "./css/App.css";
import Home from "./pages/Home";
import Vehicle from "./pages/Vehicle";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile"
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
    <AuthProvider >
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle/:id" element={<Vehicle />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      </AuthProvider>
    </>
  );
}

export default App;
