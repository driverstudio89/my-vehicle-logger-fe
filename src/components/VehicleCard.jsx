import "../css/VehicleCard.css";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no_image.jpg"

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vehicles/${vehicle.id}`);
  };

  return (
    <div className="vehicle-card" onClick={handleClick}>
      <div className="vehicle-thumbnail">
        {vehicle.image ? (
          <img src={vehicle.image} alt={vehicle.make} />
        ) : (
          <img
            src={noImage}
            alt={vehicle.make}
          />
        )}
      </div>
      <div className="vehicle-card-info">
        <h3>{vehicle.make}</h3>
        <h3>{vehicle.model}</h3>
        <p>{vehicle.registration}</p>
        <p>{vehicle.lastKilometers} km</p>
      </div>
    </div>
  );
}

export default VehicleCard;
