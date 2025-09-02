import "../css/Vehicle.css";
import { useEffect, useState } from "react";
import AddEventForm from "../components/AddEventForm";
import { getVehicle } from "../services/api";
import { useParams } from "react-router-dom";
import EventsList from "../components/EventsList";

function Vehicle() {
  const [addEventClicked, setAddEventClicked] = useState(false);

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
    const loadVehicle = async () => {
      try {
        const myVehicle = await getVehicle(id);
        console.log(myVehicle);

        setVehicle(myVehicle);
      } catch (err) {
        console.log(err);
      }
    };
    loadVehicle();
  }, []);

  return (
    <div className="vehicle">
      <h3>Vehicle info</h3>
      <div className="vehicle-info-container">
        <div className="vehicle-image">
          <img
            src={"http://localhost:8080/images/" + vehicle.image}
            alt={vehicle.make}
            onError={(e) => {
              e.target.src =
                "https://www.fogtechnologies.in/assets/img/no_blog.jpg";
            }}
          />
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
