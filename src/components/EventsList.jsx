import { useState, useEffect } from "react";
import Event from "../components/Event";
import { apiRequest } from "../services/api";
import "../css/EventsList.css";

function EventsList({ id, onEditEvent }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const myEvents = await apiRequest(`/vehicles/${id}/events`);
        setEvents(myEvents);
      } catch (err) {
        console.log(err);
      }
    };
    loadEvents();
  }, [id]);

  return (
    <div className="events-list-container">
      {events.map((event) => (
        <Event event={event} key={event.id} onEditEvent={onEditEvent} />
      ))}
    </div>
  );
}

export default EventsList;
