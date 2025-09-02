import { useState } from "react";
import "../css/AddEventForm.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddEventForm(props) {

  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    kilometers: "",
    startDate: Date.now,
    endDate: Date.now,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    console.log(formData);
    

    
    try {
      const response = await fetch(`http://localhost:8080/vehicles/${id}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        const data = await response.json();
        props.setAddEventClicked(prev => !prev);
        navigate(`/vehicles/${id}`);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrors(data);
      }
    } catch(err) {
      console.log(err.message);
      
    }


  }

  return (
    <div className="event-form-container">
      <h3>Add Event</h3>
      <form onSubmit={handleAddEvent} className="event-form">
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
        {errors && (
          <div className="error">
            <p>{errors.name}</p>
          </div>
        )}
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
        {errors && (
          <div className="error">
            <p>{errors.description}</p>
          </div>
        )}
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
        {errors && (
          <div className="error">
            <p>{errors.kilometers}</p>
          </div>
        )}
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
        {errors && (
          <div className="error">
            <p>{errors.startDate}</p>
          </div>
        )}
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
        {errors && (
          <div className="error">
            <p>{errors.endDate}</p>
          </div>
        )}
        <button type="submit" className="btn-submit">
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEventForm;
