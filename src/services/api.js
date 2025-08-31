export const getVehicles = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch("http://localhost:8080/vehicles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};

export const VehicleOptionsFromApi = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch("http://localhost:8080/vehicles/options", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};
