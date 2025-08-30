import { useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import "../css/Home.css"
import { useState } from "react";
import { getVehicles } from "../services/api.js"

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const myVehicles = await getVehicles();
        setVehicles(myVehicles)
      } catch(error) {
        console.log(error);
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
