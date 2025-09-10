import "../css/Home.css";
import { useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import { useState } from "react";
import { apiRequest } from "../services/api.js";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authContext = useAuthContext();

  useEffect(() => {
    if (!authContext.isLoading) {
      if (!authContext.isAuthenticated) {
        navigate("/profile");
      }
    }

    const loadVehicles = async () => {
      try {
        const myVehicles = await apiRequest("/vehicles");
        if (myVehicles === 0) {
        }
        setVehicles(myVehicles);
      } catch (err) {
        setError("Failed to load vehicles");
      }
    };
    loadVehicles();
  }, []);

  return (
    <div className="home">
      <div className="vehicle-grid">
        {!vehicles || vehicles.length === 0 ? (
          <div className="empty-container">
            <h4>
              No Vehicles added yet...  
              <Link to="/add-vehicle" className="add-link">
                Add Vehicle
              </Link>
            </h4>
          </div>
        ) : (
          vehicles.map((vehicle) => (
            <VehicleCard vehicle={vehicle} key={vehicle.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
