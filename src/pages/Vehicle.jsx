import "../css/Vehicle.css";
import { useState } from "react";

const vehicle = {
  id: 1,
  make: "Ford",
  model: "Focus",
  registration: "CC1234CA",
  lastKilometers: "343000",
  year: "2012",
  color: "red",
  engine: "diesel",
  created: "2024-09-23",
};

function Vehicle() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    kilometers: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
      <div>
        <h3>add event</h3>
        <form onSubmit={handleSubmit} className="event-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
          <label>Kilometers:</label>
          <input
            type="number"
            name="kilometers"
            placeholder="Kilometers"
            value={formData.kilometers}
            onChange={handleChange}
            className="form-input"
          />
          <label>Start date:</label>
          <input
            type="date"
            name="startDate"
            placeholder="Start date"
            value={formData.startDate}
            onChange={handleChange}
            className="form-input"
          />
          <label>End date:</label>
          <input
            type="date"
            name="endtDate"
            placeholder="End date"
            value={formData.endDate}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Vehicle;
