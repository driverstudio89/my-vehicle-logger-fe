import "../css/Event.css"

function Event({ event }) {
  return (
    <div className="event-container">
      <div className="event-first-row">
        <h4>{event.name}</h4>
        <p>{event.kilometers}</p>
        <p>{event.startDate}</p>
        <p>{event.endDate}</p>
      </div>
      <hr></hr>
      <p className="event-description">{event.description}</p>
    </div>
  );
}

export default Event;
