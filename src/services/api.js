import { useAuthContext } from "../context/AuthContext.jsx";

const authContext = useAuthContext;
const API_BASE_URL = "http://localhost:8080";

export const login = async (email, password) => {
  const response = await fetch(`http://localhost:8080/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  });

  return response;
};

export const refreshAccessToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: include,
  });

  if (!response.ok) {
    throw new Error("Refresh failed");
  }
  localStorage.setItem("accessToken", accessToken);
};

export const apiRequest = async (
  url,
  { method = "GET", body, headers = {} } = {}
) => {
  const token = localStorage.getItem("accessToken");

  console.log(url, method, body, headers);

  const doRequest = async () => {
    if (method === "GET") {
      return fetch(`${API_BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    } else {
      return fetch(`${API_BASE_URL}${url}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        ...(body ? { body: body } : {}),
      });
    }
  };

  let response = await doRequest();

  if (response.status === 401) {
    try {
      token = await refreshAccessToken();
      response = await doRequest();
    } catch (err) {
      authContext.logout();
      throw new Error("Session expired. Please log again.");
    }
  }

  if (!response.ok) {
    let message = `API error: ${response.status}`;
    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {}
    throw new Error(message);
  }

  if (method === "GET") {
    const data = await response.json();
    return data;
  } else {
    return response;
  }
};

// export const getVehicles = async () => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch("http://localhost:8080/vehicles", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();
//   return data;
// };

// export const getVehicle = async (id) => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(`http://localhost:8080/vehicles/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (response.status === 401) {
//     try {
//       token = await refreshAccessToken();
//       response = await doRequest();
//     } catch (err) {
//       authContext.logout();
//       throw new Error("Session expired. Please log again.");
//     }
//   }

//   const data = await response.json();
//   return data;
// };

// export const getEvents = async (id) => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(`http://localhost:8080/vehicles/${id}/events`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();
//   return data;
// };

// export const VehicleOptionsFromApi = async () => {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch("http://localhost:8080/vehicles/options", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();
//   return data;
// };
