import "./css/App.css";
import Home from "./pages/Home";
import Vehicle from "./pages/Vehicle";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile"
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AddVehicle from "./pages/AddVehicle";
import UpdateVehicle from "./pages/UpdateVehicle";
import Register from "./pages/Register"

function App() {
  return (
    <>
    <AuthProvider >
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles/:id" element={<Vehicle />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-vehicle" element={<UpdateVehicle />} />
        </Routes>
      </main>
      </AuthProvider>
    </>
  );
}

export default App;
