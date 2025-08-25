import VehicleCard from "../components/VehicleCard";
import "../css/Home.css"

function Home() {
  const vehicles = [
    {
      id: 1,
      make: "Ford",
      model: "Focus",
      year: "2012",
      lastKilometers: "343000",
    },
    {
      id: 2,
      make: "Fiat",
      model: "Bravo",
      year: "2004",
      lastKilometers: "415000",
    },
    {
      id: 3,
      make: "Opel",
      model: "Corsa",
      year: "2016",
      lastKilometers: "224500",
    },
    {
      id: 4,
      make: "Renault",
      model: "Megan",
      year: "2006",
      lastKilometers: "265300",
    },
    {
        id: 5,
        make: "Renault",
        model: "Megan",
        year: "2006",
        lastKilometers: "265300",
      },
      {
        id: 6,
        make: "Renault",
        model: "Megan",
        year: "2006",
        lastKilometers: "265300",
      },
      {
        id: 7,
        make: "Renault",
        model: "Megan",
        year: "2006",
        lastKilometers: "265300",
      },
  ];

  return (
    <div className="home">
      <div className="vehicle-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
