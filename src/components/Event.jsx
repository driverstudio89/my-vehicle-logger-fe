import "../css/Event.css";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function Event({ event, onEditEvent }) {
  const { id } = useParams();
  const [errors, setErrors] = useState("");

  const handleEditEvent = () => {
    if (onEditEvent) onEditEvent(event);
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await apiRequest(`/vehicles/${id}/events/${event.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate(`/vehicles/${id}`, { state: { refresh: true } });
      }
    } catch (err) {
      setErrors(err);
      console.log(err);
    }
  };

  return (
    <div className="event-container">
      <div className="event-first-row">
        <div className="first-row-data">
          <h4>{event.name}</h4>
          <p>{event.kilometers}</p>
          <p>{event.startDate}</p>
          <p>{event.endDate}</p>
        </div>
        <div className="buttons-group">
          <button className="btn-edit" onClick={handleEditEvent}>
            <img src={editIcon} alt="edit" />
          </button>
          <button className="btn-delete" onClick={handleDeleteEvent}>
            <img src={deleteIcon} alt="delete" />
          </button>
        </div>
      </div>
      <hr></hr>
      <p className="event-description">{event.description}</p>
    </div>
  );
}

export default Event;
