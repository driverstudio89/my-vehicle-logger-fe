import { useEffect, useState } from "react";
import "../css/AddVehicle.css";
import { VehicleOptionsFromApi } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddVehicle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "ford",
    model: "focus",
    year: "2012",
    registration: "cc1246cc",
    color: "BLUE",
    category: "CAR",
    engine: "DIESEL",
    lastKilometers: "344000",
    description: "blue ford",
  });

  const [colors, setColor] = useState([]);
  const [categories, setCategory] = useState([]);
  const [engines, setEngine] = useState([]);
  const [errors, setErrors] = useState("");

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:8080/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        const data = await response.json();
        const id = data.id;
        navigate(`/vehicles/${id}`);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrors(data);
      }
    } catch (err) {
      setErrors(err.massage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getOptions = async () => {
      try {
        const dataOptions = await VehicleOptionsFromApi();
        setColor(dataOptions.colors);
        setCategory(dataOptions.categories);
        setEngine(dataOptions.engines);
      } catch (error) {
        console.log(error);
      }
    };
    getOptions();
  }, []);

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
        {errors && (
          <div className="error">
            <p>{errors.make}</p>
          </div>
        )}

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
        {errors && (
          <div className="error">
            <p>{errors.model}</p>
          </div>
        )}

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
        {errors && (
          <div className="error">
            <p>{errors.year}</p>
          </div>
        )}

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
        {errors && (
          <div className="error">
            <p>{errors.registration}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <select
            id="color"
            type="text"
            name="color"
            value={FormData.color}
            onChange={handleChange}
            className="form-input">
            <option value="default">Choose Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        {errors && (
          <div className="error">
            <p>{errors.color}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            type="text"
            name="category"
            value={FormData.category}
            onChange={handleChange}
            className="form-input">
            <option value="default">Choose category</option>
            {categories.map((category) => (
              <option key={category.id} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {errors && (
          <div className="error">
            <p>{errors.category}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="engine">Engine</label>
          <select
            id="engine"
            type="text"
            name="engine"
            value={FormData.engine}
            onChange={handleChange}
            className="form-input">
            <option value="default">Choose engine</option>
            {engines.map((engine) => (
              <option key={engine.id} value={engine}>
                {engine}
              </option>
            ))}
          </select>
        </div>
        {errors && (
          <div className="error">
            <p>{errors.engine}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="lastKilometers">Kilometers</label>
          <input
            id="lastKilometers"
            type="number"
            name="lastKilometers"
            placeholder="Kilometers"
            value={FormData.lastKilometers}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        {errors && (
          <div className="error">
            <p>{errors.lastKilometers}</p>
          </div>
        )}

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
        {errors && (
          <div className="error">
            <p>{errors.description}</p>
          </div>
        )}

        <button className="btn-login">Add</button>
      </form>
    </div>
  );
}

export default AddVehicle;
