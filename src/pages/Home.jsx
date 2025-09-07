import { useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import "../css/Home.css"
import { useState } from "react";
import { apiRequest } from "../services/api.js"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const authContext = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!authContext.isAuthenticated) {
      navigate("/profile")
    }
    
    const loadVehicles = async () => {
      try {
        const myVehicles = await apiRequest("/vehicles");
        setVehicles(myVehicles)
      } catch(err) {
        setError("Failed to load vehicles");
      }
    };
    loadVehicles();
    
  }, []);

  return (
    <div className="home">
      <div className="vehicle-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
