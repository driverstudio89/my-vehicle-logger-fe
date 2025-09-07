import "../css/Vehicle.css";
import { useEffect, useState } from "react";
import AddEventForm from "../components/AddEventForm";
import { apiRequest } from "../services/api";
import { Route, useParams } from "react-router-dom";
import EventsList from "../components/EventsList";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no_image.jpg";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

function Vehicle() {
  const [addEventClicked, setAddEventClicked] = useState(false);
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const { id } = useParams();

  const addEventClickHandler = (e) => {
    setAddEventClicked(true);
  };

  const [vehicle, setVehicle] = useState({
    id: "",
    make: "",
    model: "",
    registration: "",
    lastKilometers: "",
    year: "",
    color: "",
    engine: "",
    created: "",
  });

  useEffect(() => {
    if (!authContext.isLoading) {
      if (!authContext.isAuthenticated) {
        navigate("/profile");
      }
    }

    const loadVehicle = async () => {
      try {
        const myVehicle = await apiRequest(`/vehicles/${id}`);

        setVehicle(myVehicle);
      } catch (err) {
        console.log(err);
      }
    };
    loadVehicle();
  }, []);

  const handleEditVehicle = () => {
    navigate("/update-vehicle", {
      state: {vehicle}
    });
    
  };

  const handleDeleteVehicle = async () => {

    try {
      const response = await apiRequest(`/vehicles/${id}`, {
        method: "DELETE",
      });
        
      if (response.ok) {
        navigate("/")
      }
      
    } catch(err) {
      setErrors(err);
      console.log(err);
    }
    
  }

  return (
    <div className="vehicle">

      {errors && <div className="login-errors">
          <p>{errors.email}</p>
          <p>{errors.password}</p>
          <p>{errors.error}</p>
        </div>}
      
      <h3>Vehicle info</h3>
      <div className="buttons-group">
        <button className="btn-edit" onClick={handleEditVehicle}>
          <img src={editIcon} alt="edit" />
        </button>
        <button className="btn-delete" onClick={handleDeleteVehicle}>
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
      <div className="vehicle-info-container">
        <div className="vehicle-image">
          {vehicle.image ? (
            <img src={vehicle.image} alt={vehicle.make} />
          ) : (
            <img src={noImage} alt={vehicle.make} />
          )}
        </div>
        <div className="vehicle-page-info">
          <h3>{vehicle.make}</h3>
          <h3>{vehicle.model}</h3>
          <p>{vehicle.registration}</p>
          <p>{vehicle.lastKilometers} km</p>
          <p>{vehicle.year}</p>
          <p>{vehicle.color}</p>
          <p>{vehicle.engine}</p>
          <p>{vehicle.created}</p>
        </div>
      </div>
      <button className="btn-add-event" onClick={addEventClickHandler}>
        Add Event
      </button>
      {addEventClicked ? (
        <AddEventForm setAddEventClicked={setAddEventClicked} />
      ) : (
        <EventsList id={id} />
      )}
    </div>
  );
}

export default Vehicle;
