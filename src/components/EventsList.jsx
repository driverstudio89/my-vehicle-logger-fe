import {useState, useEffect} from "react"
import Event from "../components/Event";
import { getEvents } from "../services/api";
import "../css/EventsList.css"

function EventsList(props) {
    console.log(props.id);
    

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
          try {
            const myEvents = await getEvents(props.id)
            setEvents(myEvents);
          } catch(err) {
            console.log(err);
          }
        }
        loadEvents();
      }, []);

    return <div className="events-list-container">
        {events.map((event) => <Event event={event} key={event.id} />)}
    </div>
}

export default EventsList