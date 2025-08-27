import "./css/App.css";
import Home from "./pages/Home";
import Vehicle from "./pages/Vehicle";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle/:id" element={<Vehicle />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
