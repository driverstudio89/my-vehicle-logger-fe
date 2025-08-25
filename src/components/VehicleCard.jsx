import "../css/VehicleCard.css";
import { useNavigate } from "react-router-dom";

function VehicleCard({vehicle}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/vehicles/${vehicle.id}`);
    }

    return <div className="vehicle-card" onClick={handleClick}>
        <div className="vehicle-thumbnail">
            <img src="https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=" alt={VehicleCard.make} />
        </div>
        <div className="vehicle-info">
            <h3>{vehicle.make}</h3>
            <h3>{vehicle.model}</h3>
            <p>Year {vehicle.year}</p>
            <p>{vehicle.lastKilometers} km</p>
        </div>
    </div>
}

export default VehicleCard