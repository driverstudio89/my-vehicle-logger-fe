import "../css/Vehicle.css";
import { useEffect, useState } from "react";
import AddEventForm from "../components/AddEventForm";
import Event from "../components/Event";
import { getVehicle } from "../services/api";
import { useParams } from "react-router-dom";

const events = [
  {
    id: 1,
    name: "Oil change",
    description: "changed oil and filters",
    kilometers: "123344",
    startDate: "2024-09-23",
    endDate: "2024-09-23",
  },
  {
    id: 2,
    name: "Tyre rotation",
    description:
      "Change summer tyres with winter tyres, Change summer tyres with winter tyres, Change summer tyres with winter tyres",
    kilometers: "223344",
    startDate: "2024-09-23",
    endDate: "2024-09-23",
  },
];

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
        setVehicle(myVehicle);
        console.log(myVehicle);
        
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
        <AddEventForm />
      ) : (
        events.map((event) => <Event event={event} key={event.id} />)
      )}
    </div>
  );
}

export default Vehicle;
