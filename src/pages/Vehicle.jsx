import "../css/Vehicle.css";
import { useEffect, useState } from "react";
import AddEventForm from "../components/AddEventForm";
import UpdateEventForm from "../components/UpdateEventForm";
import { apiRequest } from "../services/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import EventsList from "../components/EventsList";
import { useAuthContext } from "../context/AuthContext";
import noImage from "../assets/no_image.jpg";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

function Vehicle() {
  const [addEventClicked, setAddEventClicked] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState("");

  const { id } = useParams();

  const addEventClickHandler = (e) => {
    setAddEventClicked(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
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
    description: "",
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

    if (location.state?.refresh) {
      setVehicle(null);
    }
    loadVehicle();
  }, [location.key]);

  const handleEditVehicle = () => {
    navigate("/update-vehicle", {
      state: { vehicle },
    });
  };

  const handleDeleteVehicle = async () => {
    try {
      const response = await apiRequest(`/vehicles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      setErrors(err);
      console.log(err);
    }
  };

  const refreshVehicle = async () => {
    try {
      const myVehicle = await apiRequest(`/vehicles/${id}`);
      setVehicle(myVehicle);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!vehicle ? (
        <p>Loading...</p>
      ) : (
        <div className="vehicle">
          {errors && (
            <div className="login-errors">
              <p>{errors.email}</p>
              <p>{errors.password}</p>
              <p>{errors.error}</p>
            </div>
          )}

          <h3>Vehicle info</h3>
          <div className="vehicle-buttons-group">
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
              <p>{vehicle.description}</p>
            </div>

            <div className="vehicle-page-info">
              <h3>Make: {vehicle.make}</h3>
              <h3>Model: {vehicle.model}</h3>
              <p>Registration: {vehicle.registration}</p>
              <p>Kilometers: {vehicle.lastKilometers} km</p>
              <p>Year: {vehicle.year}</p>
              <p>Color: {vehicle.color}</p>
              <p>Engine: {vehicle.engine}</p>
              <p>Created: {vehicle.created}</p>
            </div>
          </div>

          {addEventClicked ? (
            <AddEventForm
            setAddEventClicked={setAddEventClicked}
            onCancel={() => setAddEventClicked(false)}
             />
          ) : editingEvent ? (
            <UpdateEventForm
              event={editingEvent}
              onCancel={() => setEditingEvent(null)}
              onSuccess={async () => {
                setEditingEvent(null);
                await refreshVehicle();
              }}
            />
          ) : (
            <div>
              <button className="btn-add-event" onClick={addEventClickHandler}>
                Add Event
              </button>
              <EventsList id={id} onEditEvent={handleEditEvent} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Vehicle;
