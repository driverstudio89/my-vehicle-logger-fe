import { useState } from "react";

function AddVehicle() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registration: "",
    color: "",
    category: "",
    engine: "",
    kilometers: "",
    description: "",
  });

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="add-vehicle">
      <h3>Add Vehicle</h3>
      <form onSubmit={handleAddVehicle} className="add-vehicle-form">
        <div className="form-group">
          <label htmlFor="make">Make</label>
          <input
            id="make"
            type="text"
            name="make"
            placeholder="Make"
            value={FormData.make}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            id="model"
            type="text"
            name="model"
            placeholder="Model"
            value={FormData.model}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            name="year"
            placeholder="Year"
            value={FormData.year}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="registration">Registration</label>
          <input
            id="registration"
            type="text"
            name="registration"
            placeholder="Registration"
            value={FormData.registration}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            id="color"
            type="text"
            name="color"
            placeholder="Color"
            value={FormData.color}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="Category"
            value={FormData.category}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="engine">Engine</label>
          <input
            id="engine"
            type="text"
            name="engine"
            placeholder="Engine"
            value={FormData.engine}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="kilometers">Kilometers</label>
          <input
            id="kilometers"
            type="text"
            name="kilometers"
            placeholder="Kilometers"
            value={FormData.kilometers}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            type="text"
            name="description"
            placeholder="Description"
            value={FormData.description}
            onChange={handleChange}
            className="form-input"
          />
        </div>



        <button className="btn-login">Add</button>
      </form>
    </div>
  );
}

export default AddVehicle;
