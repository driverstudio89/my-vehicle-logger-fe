import "./css/App.css";
import Home from "./pages/Home";
import Vehicle from "./pages/Vehicle"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/vehicle/:id" element={<Vehicle />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
