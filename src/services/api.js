const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  console.log("try to login");
  
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({ email, password }),
  });

  return response;
};

export const refreshAccessToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Refresh failed");
  }
  const data = await response.json();
  const token = data.token;

  localStorage.setItem("accessToken", token);

  return token;
};

export const apiRequest = async (url, {
  method = "GET", body, headers = {} } = {}) => {

  const doRequest = async () => {
    console.log("try to fetch");
    const token = localStorage.getItem("accessToken");

    if (method === "GET") {
      console.log(`${API_BASE_URL}${url}`);
      
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
      console.log(`${API_BASE_URL}${url}`);
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
      const token = await refreshAccessToken();
      response = await doRequest();
    } catch (err) {
      console.log(err);
      throw new Error("Session expired. Please log again.");
    }
  }

  if (method === "GET") {
    const data = await response.json();
    return data;
  } else {
    return response;
  }
};
