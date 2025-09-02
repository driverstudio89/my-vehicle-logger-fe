import "../css/VehicleCard.css";
import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vehicles/${vehicle.id}`);
  };

  return (
    <div className="vehicle-card" onClick={handleClick}>
      <div className="vehicle-thumbnail">
        <img
          src={"http://localhost:8080/images/" + vehicle.image}
          alt={vehicle.make}
          onError={(e) => {
            e.target.src =
              "https://www.fogtechnologies.in/assets/img/no_blog.jpg";
          }}
        />
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
