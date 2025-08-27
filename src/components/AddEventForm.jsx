import { useState } from "react";
import "../css/AddEventForm.css";

function AddEventForm() {
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
    <div className="event-form-container">
      <h3>Add Event</h3>
      <form onSubmit={handleSubmit} className="event-form">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        />
        <label htmlFor="kilometers">Kilometers:</label>
        <input
          id="kilometes"
          type="number"
          name="kilometers"
          placeholder="Kilometers"
          value={formData.kilometers}
          onChange={handleChange}
          className="form-input"
        />
        <label htmlFor="startDate">Start date:</label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          placeholder="Start date"
          value={formData.startDate}
          onChange={handleChange}
          className="form-input"
        />
        <label htmlFor="endDate">End date:</label>
        <input
          id="endDate"
          type="date"
          name="endDate"
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
  );
}

export default AddEventForm;
