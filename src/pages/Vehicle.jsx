import "../css/Vehicle.css";
import { useEffect, useState } from "react";
import AddEventForm from "../components/AddEventForm";
import Event from "../components/Event";
import { getVehicle, getEvents } from "../services/api";
import { useParams } from "react-router-dom";

function Vehicle() {
  const [addEventClicked, setAddEventClicked] = useState(false);
  const [events, setEvents] = useState([]);

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
    const loadEvents = async () => {
      try {
        const myEvents = await getEvents(id)
        setEvents(myEvents);
      } catch(err) {
        console.log(err);
      }
    }
    loadEvents();
  }, []);
  

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const myVehicle = await getVehicle(id);
        setVehicle(myVehicle);
      } catch(err) {
        console.log(err);
      }
    }
    loadVehicle();
  }, []);
  
  return (
    <div className="vehicle">
      <h3>Vehicle info</h3>
      <div className="vehicle-info-container">
        <div className="vehicle-image">
          <img
            src="https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="
            alt={vehicle.make}
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
        events.map((event) => <Event event={event} key={event.id} />)
      )}
    </div>
  );
}

export default Vehicle;
